// functions/api/building-intelligence.js
// DB+ Building Intelligence — Analyst RAG for UK Building Regulations
// Endpoint: /api/building-intelligence
//
// Three possible states:
//   - needs_clarification  → asks for missing data before analysing
//   - requires_attention   → flags gaps / contradictions / risks
//   - clear_preliminary    → no issues found; preliminary observation only
//
// In ALL cases, verdict = "PENDING_ARCHITECT_REVIEW".

const ANALYST_INSTRUCTIONS = `
You are DB+ Building Intelligence Analyst, a technical analyst
working FOR the responsible architect (David Bonilla), not
replacing them.

YOUR FUNCTION:
Analyse queries about Building Regulations - England using
EXCLUSIVELY the documentary fragments provided in the CONTEXT.
Do not use uncited external knowledge.

GOLDEN RULES:
1. NEVER give a final verdict. Your output is an analysis
   report for the architect to decide.
2. EVERY technical statement must be followed by a citation
   in the format: [Document · Section · p.N]
3. If a fragment in the context contradicts another, you MUST
   flag it explicitly in the CONTRADICTIONS section.
4. If the user has not provided enough data for a rigorous
   analysis, you MUST ask for it before answering (max 3
   concrete questions).
5. If the answer depends on a datum not present in the context,
   say: "Not covered by the indexed sources".
6. Do not invent paragraph numbers, page numbers or citations.
7. IF AND ONLY IF:
     - no gaps are detected,
     - no contradictions exist between the retrieved sources,
     - all required data is present in the user's question,
   THEN you must explicitly state that the case appears CLEAR
   from the indexed sources — BUT you must frame it as a
   PRELIMINARY OBSERVATION, never as a verdict. Use wording
   such as: "Based on the indexed sources, this case appears
   clear and no gaps or contradictions have been detected.
   This is a preliminary observation only and requires the
   responsible architect's affirmation before any decision."
   Set "overall_assessment" to "clear_preliminary" in this case.

DETERMINING overall_assessment:
- "needs_clarification" → when status is needs_clarification
- "requires_attention"   → when gaps OR contradictions exist
- "clear_preliminary"    → when gaps AND contradictions are empty
                            AND data is sufficient

RESPONSE FORMAT (strict JSON):
{
  "status": "analysis_complete" | "needs_clarification",
  "overall_assessment": "clear_preliminary" | "requires_attention" | "needs_clarification",
  "clarifying_questions": ["q1", "q2", "q3"],
  "technical_answer": "string with inline citations",
  "sources_used": [numbers of the source IDs referenced],
  "gaps": [
    { "issue": "...", "risk": "low|medium|high", "citation": "..." }
  ],
  "contradictions": [
    {
      "between": ["cite1", "cite2"],
      "description": "...",
      "resolution_needed": "..."
    }
  ],
  "missing_data": ["datum1", "datum2"],
  "preliminary_clear_statement": "string, ONLY present when overall_assessment is clear_preliminary"
}

If status is "needs_clarification", leave technical_answer,
gaps, contradictions and missing_data as empty strings/arrays.
`;

const EMBEDDING_MODEL = "@cf/baai/bge-large-en-v1.5";
const ANALYSIS_MODEL = "@cf/meta/llama-3.3-70b-instruct";

const CORS_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(status, payload) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: CORS_HEADERS,
  });
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

function buildQueries(question) {
  return [
    question,
    `${question} — exceptions, exemptions, alternatives, cases where not required`,
    `${question} — mandatory requirements, must, shall, approved document`,
  ];
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const question =
      typeof body?.question === "string" ? body.question.trim() : "";

    if (!question) {
      return jsonResponse(400, {
        success: false,
        answer: "Please enter a technical question.",
      });
    }

    if (question.length > 8000) {
      return jsonResponse(400, {
        success: false,
        answer: "Your question is too long.",
      });
    }

    // 1. Embeddings for the 3 angled queries
    const queries = buildQueries(question);
    const embeddings = await env.AI.run(EMBEDDING_MODEL, {
      text: queries,
    });

    // 2. Query Vectorize for each embedding
    const allMatches = [];
    for (const vector of embeddings.data) {
      const result = await env.VECTORIZE.query(vector, {
        topK: 5,
        returnMetadata: true,
      });
      allMatches.push(...result.matches);
    }

    // 3. Deduplicate and rank
    const seen = new Set();
    const uniqueMatches = allMatches
      .filter((m) => {
        if (seen.has(m.id)) return false;
        seen.add(m.id);
        return true;
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    if (uniqueMatches.length === 0) {
      return jsonResponse(200, {
        success: true,
        status: "needs_clarification",
        overall_assessment: "needs_clarification",
        clarifying_questions: [
          "I could not find any indexed document relevant to your question. Could you rephrase it using technical terms from the Building Regulations?",
        ],
        analysis: null,
        verdict: "PENDING_ARCHITECT_REVIEW",
        disclaimer:
          "No relevant sources found in the indexed library. A preliminary analysis cannot be produced without sources.",
      });
    }

    // 4. Build context with IDs for citation
    const sources = uniqueMatches.map((m, i) => ({
      id: i + 1,
      document: m.metadata?.document || "Unknown document",
      section: m.metadata?.section || "Unknown section",
      page: m.metadata?.page || null,
      version: m.metadata?.version || null,
      date: m.metadata?.date || null,
      excerpt: (m.metadata?.text || "").slice(0, 1500),
      relevance_score: Number(m.score.toFixed(3)),
    }));

    const contextText = sources
      .map(
        (s) =>
          `[SOURCE ${s.id}] ${s.document} · ${s.section} · p.${s.page}${s.version ? ` (v.${s.version})` : ""}\n${s.excerpt}`
      )
      .join("\n\n---\n\n");

    // 5. Call the analyst model
    const aiResponse = await env.AI.run(ANALYSIS_MODEL, {
      messages: [
        { role: "system", content: ANALYST_INSTRUCTIONS },
        {
          role: "user",
          content: `CONTEXT (indexed documents):\n\n${contextText}\n\nUSER QUESTION:\n${question}`,
        },
      ],
      max_tokens: 2048,
    });

    // 6. Parse JSON response
    let parsed;
    try {
      const raw = aiResponse.response || "";
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      parsed = JSON.parse(jsonMatch ? jsonMatch[0] : raw);
    } catch {
      parsed = {
        status: "analysis_complete",
        overall_assessment: "requires_attention",
        clarifying_questions: [],
        technical_answer: aiResponse.response || "No answer generated.",
        sources_used: sources.map((s) => s.id),
        gaps: [],
        contradictions: [],
        missing_data: [],
        preliminary_clear_statement: "",
      };
    }

    // Normalise overall_assessment
    let overall = parsed.overall_assessment;
    if (parsed.status === "needs_clarification") {
      overall = "needs_clarification";
    } else if (!overall) {
      const hasIssues =
        (parsed.gaps && parsed.gaps.length > 0) ||
        (parsed.contradictions && parsed.contradictions.length > 0);
      overall = hasIssues ? "requires_attention" : "clear_preliminary";
    }

    // 7. Return
    return jsonResponse(200, {
      success: true,
      status: parsed.status || "analysis_complete",
      overall_assessment: overall,
      clarifying_questions: parsed.clarifying_questions || [],
      analysis: {
        technical_answer: parsed.technical_answer || "",
        sources: sources,
        sources_used: parsed.sources_used || [],
        gaps: parsed.gaps || [],
        contradictions: parsed.contradictions || [],
        missing_data: parsed.missing_data || [],
        preliminary_clear_statement:
          overall === "clear_preliminary"
            ? parsed.preliminary_clear_statement ||
              "Based on the indexed sources, this case appears clear and no gaps or contradictions have been detected. This is a preliminary observation only and requires the responsible architect's affirmation before any decision."
            : null,
      },
      verdict: "PENDING_ARCHITECT_REVIEW",
      disclaimer:
        "Preliminary analysis. Does not replace validation by the responsible architect.",
      module: "building-regulations",
      jurisdiction: "England",
    });
  } catch (error) {
    return jsonResponse(500, {
      success: false,
      answer: "DB+ Building Intelligence is temporarily unavailable.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
