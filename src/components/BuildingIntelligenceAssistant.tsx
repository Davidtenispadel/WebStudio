import React, { useState } from "react";

const BuildingIntelligenceAssistant: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;

    setLoading(true);

    try {
      const response = await fetch(
        "/functions/api/building-intelligence",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question,
          }),
        }
      );

      const data = await response.json();

      setAnswer(data.answer || "No response.");
    } catch (error) {
      setAnswer("Unable to contact Building Intelligence.");
    }

    setLoading(false);
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
        placeholder="Can I build a 3 metre rear extension?"
        className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white min-h-[120px]"
      />

      <button
        onClick={handleAsk}
        disabled={loading}
        className="mt-4 px-6 py-3 bg-red-600 rounded-xl hover:bg-red-700 transition"
      >
        {loading ? "Analysing..." : "Ask"}
      </button>

      {answer && (
        <div className="mt-8 p-6 rounded-xl bg-white/10 border border-white/10">
          <p className="text-white whitespace-pre-wrap">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
};

export default BuildingIntelligenceAssistant;
