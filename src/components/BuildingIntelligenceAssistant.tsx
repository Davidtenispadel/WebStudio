// src/components/BuildingIntelligenceAssistant.tsx
// DB+ Building Intelligence — Chat UI
// Llama al endpoint /api/building-intelligence en Cloudflare Pages

import React, { useState } from "react";

const API_ENDPOINT = "/api/building-intelligence";

const BuildingIntelligenceAssistant: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAsk = async () => {
    const trimmed = question.trim();
    if (!trimmed || loading) return;

    setLoading(true);
    setError(null);
    setAnswer("");

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: trimmed }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.answer || `Request failed (HTTP ${response.status})`
        );
      }

      setAnswer(data.answer || "No response.");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unknown error";
      setError(message);
      setAnswer(
        "Unable to contact Building Intelligence. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <div className="bg-black text-white rounded-3xl p-8 md:p-12 shadow-2xl">
      <p className="text-xs tracking-[0.35em] uppercase text-white/50 mb-4">
        Artificial Intelligence
      </p>

      <h3 className="text-3xl md:text-5xl font-light mb-6">
        DB+ Building Intelligence Assistant
      </h3>

      <p className="text-white/70 mb-8">
        Ask questions about planning permission, building regulations,
        architecture, structures, HVAC, sustainability and construction.
      </p>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Can I build a 3 metre rear extension?"
        className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white min-h-[120px] outline-none focus:ring-2 focus:ring-red-500/50"
        disabled={loading}
      />

      <div className="mt-4 flex items-center gap-4">
        <button
          onClick={handleAsk}
          disabled={loading || !question.trim()}
          className="px-6 py-3 bg-red-600 rounded-xl hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Analysing..." : "Ask"}
        </button>

        {question && !loading && (
          <button
            onClick={() => {
              setQuestion("");
              setAnswer("");
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

      {answer && !error && (
        <div className="mt-8 p-6 rounded-xl bg-white/10 border border-white/10">
          <p className="text-white whitespace-pre-wrap leading-relaxed">
            {answer}
          </p>

          <div className="mt-4 pt-4 border-t border-white/10 text-xs text-white/40 flex items-center gap-3">
            <span>Module: Building Regulations</span>
            <span>·</span>
            <span>Jurisdiction: England</span>
            <span>·</span>
            <span>Status: Preliminary</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuildingIntelligenceAssistant;
