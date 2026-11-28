// functions/api/building-intelligence.js

// El sistema de instrucciones se mantiene igual
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

// Manejador para peticiones POST
export async function onRequestPost(context) {
  // Accedemos al request y a las variables de entorno a través de context
  const { request, env } = context;

  const corsHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  try {
    const body = await request.json();
    const question = typeof body?.question === "string" ? body.question.trim() : "";

    if (!question) {
      return new Response(
        JSON.stringify({ success: false, answer: "Please enter a technical question." }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (question.length > 8000) {
      return new Response(
        JSON.stringify({ success: false, answer: "Your question is too long." }),
        { status: 400, headers: corsHeaders }
      );
    }

    // ACCESO A LA VARIABLE DE ENTORNO EN CLOUDFLARE
    const apiKey = env.OPENAI_API_KEY;
    const model = env.OPENAI_MODEL || "gpt-4o"; // Modelo válido

    if (!apiKey) {
      throw new Error("Missing API configuration. Set OPENAI_API_KEY in Cloudflare.");
    }

    const aiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        instructions: SYSTEM_INSTRUCTIONS,
        input: question,
        store: false
      })
    });

    if (!aiResponse.ok) {
      throw new Error("AI service request failed.");
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

    return new Response(
      JSON.stringify({
        success: true,
        question,
        answer,
        module: "building-regulations",
        jurisdiction: "England",
        sources: [],
        verified: false
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        answer: "DB+ Building Intelligence is temporarily unavailable."
      }),
      { status: 500, headers: corsHeaders }
    );
  }
}

// Manejador para peticiones OPTIONS (preflight CORS)
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
