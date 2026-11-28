// functions/api/building-intelligence.js
// DB+ Building Intelligence — Cloudflare Pages Function
// Endpoint público: /api/building-intelligence

const SYSTEM_INSTRUCTIONS = `
You are DB+ Building Intelligence, a technical AI assistant
specialising in buildings, architecture and construction.

CURRENT KNOWLEDGE SCOPE:
Building Regulations - England.

You may assist with:
- Building Regulations
- Approved Documents
- Building construction
- Architecture
- Fire safety
- Energy efficiency
- Ventilation
- Structural principles
- Accessibility
- Materials and construction

IMPORTANT LIMITATIONS:
- You do not currently have access to an indexed DB+ document library.
- Do not claim to have checked or verified an official document.
- Do not invent document paragraph numbers, page numbers or citations.
- Distinguish general technical guidance from verified regulatory requirements.
- Explain when requirements depend on the building, project or jurisdiction.
- Highlight when professional verification is necessary.
- Do not present preliminary calculations as certified engineering designs.
- If information is uncertain, say so clearly.

RESPONSE STYLE:
- Respond in the language used by the user.
- Use clear headings and structured explanations.
- Explain technical matters in a practical and professional manner.
- Where relevant, identify the applicable Approved Document,
  but do not invent specific references.
`;

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

// Preflight CORS
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

// Petición principal
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

    const apiKey = env.OPENAI_API_KEY;
    const model = env.OPENAI_MODEL || "gpt-4o";

    if (!apiKey) {
      return jsonResponse(500, {
        success: false,
        answer:
          "DB+ Building Intelligence is not configured. Missing OPENAI_API_KEY.",
      });
    }

    const aiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        instructions: SYSTEM_INSTRUCTIONS,
        input: question,
        store: false,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      return jsonResponse(502, {
        success: false,
        answer: "AI service request failed.",
        details: errorText.slice(0, 500),
      });
    }

    const result = await aiResponse.json();

    const answer =
      result.output_text ||
      result.output
        ?.filter((item) => item.type === "message")
        ?.flatMap((item) => item.content || [])
        ?.filter((content) => content.type === "output_text")
        ?.map((content) => content.text)
        ?.join("\n") ||
      "The AI could not generate a response.";

    return jsonResponse(200, {
      success: true,
      question,
      answer,
      module: "building-regulations",
      jurisdiction: "England",
      sources: [],
      verified: false,
    });
  } catch (error) {
    return jsonResponse(500, {
      success: false,
      answer: "DB+ Building Intelligence is temporarily unavailable.",
    });
  }
}
