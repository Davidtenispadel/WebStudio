export default async function handler(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const question = body?.question || '';

    return new Response(
      JSON.stringify({
        success: true,
        question,
        answer:
          'DB+ Building Intelligence Assistant is under development. Future versions will provide guidance on planning permission, building regulations, building systems, energy, fire safety and construction standards.'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        answer: 'An error occurred.'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}
