export async function GET() {
  const status = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      api: 'ok',
      anthropicKey: process.env.ANTHROPIC_API_KEY
        ? 'configured'
        : 'missing'
    }
  }

  return Response.json(status)
}
