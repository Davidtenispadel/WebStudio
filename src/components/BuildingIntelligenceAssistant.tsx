// src/components/BuildingIntelligenceAssistant.tsx
// DB+ Building Intelligence — Analyst UI
//
// Three outcome states rendered distinctly:
//   - needs_clarification → amber panel with questions
//   - requires_attention  → full analysis with gaps + contradictions
//   - clear_preliminary   → green panel: "preliminary clear, architect must affirm"
//
// In all three, a red "Architect verdict pending" footer is shown.

import React, { useState } from "react";

const API_ENDPOINT = "/api/building-intelligence";

type Source = {
  id: number;
  document: string;
  section: string;
  page: number | null;
  version: string | null;
  date: string | null;
  excerpt: string;
  relevance_score: number;
};

type Gap = {
  issue: string;
  risk: "low" | "medium" | "high";
  citation: string;
};

type Contradiction = {
  between: string[];
  description: string;
  resolution_needed: string;
};

type Overall =
  | "clear_preliminary"
  | "requires_attention"
  | "needs_clarification";

type AnalysisResponse = {
  success: boolean;
  status: "analysis_complete" | "needs_clarification";
  overall_assessment: Overall;
  clarifying_questions: string[];
  analysis: {
    technical_answer: string;
    sources: Source[];
    sources_used: number[];
    gaps: Gap[];
    contradictions: Contradiction[];
    missing_data: string[];
    preliminary_clear_statement: string | null;
  } | null;
  verdict: "PENDING_ARCHITECT_REVIEW";
  disclaimer: string;
};

const riskColor: Record<Gap["risk"], string> = {
  low: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
  medium: "text-amber-300 border-amber-500/30 bg-amber-500/10",
  high: "text-red-300 border-red-500/30 bg-red-500/10",
};

const BuildingIntelligenceAssistant: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAsk = async () => {
    const trimmed = question.trim();
    if (!trimmed || loading) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed }),
      });

      const data = (await response.json()) as AnalysisResponse;

      if (!response.ok || !data.success) {
        throw new Error(`Request failed (HTTP ${response.status})`);
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <div className="bg-black text-white rounded-3xl p-8 md:p-12 shadow-2xl">
      <p className="text-xs tracking-[0.35em] uppercase text-white/50 mb-4">
        Technical Analyst · Building Regulations England
      </p>

      <h3 className="text-3xl md:text-5xl font-light mb-6">
        DB+ Building Intelligence Analyst
      </h3>

      <p className="text-white/70 mb-8">
        Ask a technical question. The analyst retrieves official sources,
        flags gaps and contradictions, and prepares the case for the
        responsible architect's final verdict.
      </p>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ej: Can I build a 3 metre rear extension on a semi-detached house in Northamptonshire?"
        className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white min-h-[120px] outline-none focus:ring-2 focus:ring-red-500/50"
        disabled={loading}
      />

      <div className="mt-4 flex items-center gap-4">
        <button
          onClick={handleAsk}
          disabled={loading || !question.trim()}
          className="px-6 py-3 bg-red-600 rounded-xl hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Analysing sources..." : "Analyse"}
        </button>

        {question && !loading && (
          <button
            onClick={() => {
              setQuestion("");
              setResult(null);
              setError(null);
            }}
            className="text-white/50 hover:text-white text-sm transition"
          >
            Clear
          </button>
        )}
      </div>

      {error && (
        <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-8 space-y-6">
          {/* ── STATE: needs_clarification ── */}
          {result.overall_assessment === "needs_clarification" && (
            <div className="p-6 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <h4 className="text-amber-300 font-medium mb-3">
                More data needed before analysis
              </h4>
              <ul className="space-y-2 text-white/80 text-sm">
                {result.clarifying_questions.map((q, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-amber-400">{i + 1}.</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ── STATE: clear_preliminary ── */}
          {result.overall_assessment === "clear_preliminary" &&
            result.analysis && (
              <>
                {result.analysis.technical_answer && (
                  <section className="p-6 rounded-xl bg-white/10 border border-white/10">
                    <h4 className="text-white/50 text-xs tracking-[0.25em] uppercase mb-3">
                      Technical answer
                    </h4>
                    <p className="text-white whitespace-pre-wrap leading-relaxed">
                      {result.analysis.technical_answer}
                    </p>
                  </section>
                )}

                <section className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                  <h4 className="text-emerald-300 font-medium mb-3">
                    Preliminary observation — no issues detected
                  </h4>
                  <p className="text-white/85 text-sm leading-relaxed">
                    {result.analysis.preliminary_clear_statement}
                  </p>
                  <p className="text-emerald-200/70 text-xs mt-3 italic">
                    This is not a verdict. The responsible architect must
                    affirm this observation before any project decision is
                    taken.
                  </p>
                </section>

                {result.analysis.sources.length > 0 && (
                  <section className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <h4 className="text-white/50 text-xs tracking-[0.25em] uppercase mb-4">
                      Documentary basis
                    </h4>
                    <ol className="space-y-3">
                      {result.analysis.sources.map((s) => (
                        <li key={s.id} className="text-sm text-white/80">
                          <div className="flex items-start gap-2">
                            <span className="text-emerald-400 font-mono">
                              [{s.id}]
                            </span>
                            <div>
                              <div className="font-medium text-white">
                                {s.document} · {s.section}
                                {s.page !== null && ` · p.${s.page}`}
                                {s.version && ` · v.${s.version}`}
                              </div>
                              <div className="text-white/60 mt-1 italic">
                                "{s.excerpt.slice(0, 200)}..."
                              </div>
                              <div className="text-xs text-white/40 mt-1">
                                Relevance: {s.relevance_score}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </section>
                )}
              </>
            )}

          {/* ── STATE: requires_attention ── */}
          {result.overall_assessment === "requires_attention" &&
            result.analysis && (
              <>
                {result.analysis.technical_answer && (
                  <section className="p-6 rounded-xl bg-white/10 border border-white/10">
                    <h4 className="text-white/50 text-xs tracking-[0.25em] uppercase mb-3">
                      Technical answer
                    </h4>
                    <p className="text-white whitespace-pre-wrap leading-relaxed">
                      {result.analysis.technical_answer}
                    </p>
                  </section>
                )}

                {result.analysis.sources.length > 0 && (
                  <section className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <h4 className="text-white/50 text-xs tracking-[0.25em] uppercase mb-4">
                      Documentary basis
                    </h4>
                    <ol className="space-y-3">
                      {result.analysis.sources.map((s) => (
                        <li key={s.id} className="text-sm text-white/80">
                          <div className="flex items-start gap-2">
                            <span className="text-red-400 font-mono">
                              [{s.id}]
                            </span>
                            <div>
                              <div className="font-medium text-white">
                                {s.document} · {s.section}
                                {s.page !== null && ` · p.${s.page}`}
                                {s.version && ` · v.${s.version}`}
                              </div>
                              <div className="text-white/60 mt-1 italic">
                                "{s.excerpt.slice(0, 200)}..."
                              </div>
                              <div className="text-xs text-white/40 mt-1">
                                Relevance: {s.relevance_score}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </section>
                )}

                <section className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-white/50 text-xs tracking-[0.25em] uppercase mb-4">
                    Gaps and risks detected
                  </h4>
                  {result.analysis.gaps.length === 0 ? (
                    <p className="text-white/50 text-sm">
                      No gaps detected in the retrieved sources.
                    </p>
                  ) : (
                    <ul className="space-y-3">
                      {result.analysis.gaps.map((g, i) => (
                        <li
                          key={i}
                          className={`p-4 rounded-lg border text-sm ${riskColor[g.risk]}`}
                        >
                          <div className="font-medium mb-1">{g.issue}</div>
                          <div className="text-xs opacity-80">
                            Risk: {g.risk} · {g.citation}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>

                <section className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-white/50 text-xs tracking-[0.25em] uppercase mb-4">
                    Contradictions between sources
                  </h4>
                  {result.analysis.contradictions.length === 0 ? (
                    <p className="text-white/50 text-sm">
                      No contradictions detected in the retrieved sources.
                    </p>
                  ) : (
                    <ul className="space-y-4">
                      {result.analysis.contradictions.map((c, i) => (
                        <li
                          key={i}
                          className="p-4 rounded-lg border border-purple-500/30 bg-purple-500/10 text-sm"
                        >
                          <div className="text-purple-300 text-xs mb-2">
                            Between: {c.between.join(" ←→ ")}
                          </div>
                          <div className="text-white/90 mb-2">
                            {c.description}
                          </div>
                          <div className="text-purple-200 text-xs">
                            Resolution needed: {c.resolution_needed}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>

                {result.analysis.missing_data.length > 0 && (
                  <section className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <h4 className="text-white/50 text-xs tracking-[0.25em] uppercase mb-4">
                      Data required to close the analysis
                    </h4>
                    <ul className="space-y-2 text-sm text-white/80">
                      {result.analysis.missing_data.map((m, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-amber-400">•</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </>
            )}

          {/* ── FOOTER: always shown ── */}
          <section className="p-6 rounded-xl bg-red-500/10 border border-red-500/30">
            <h4 className="text-red-300 font-medium mb-2">
              Architect verdict pending
            </h4>
            <p className="text-white/80 text-sm leading-relaxed">
              {result.disclaimer} A preliminary observation — including a
              "clear" one — is an opinion of the analyst, not a regulatory
              verdict. The responsible architect must affirm it before any
              project decision is taken.
            </p>
          </section>
        </div>
      )}
    </div>
  );
};

export default BuildingIntelligenceAssistant;
