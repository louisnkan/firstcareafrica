export async function GET() {
  return Response.json({
    status: 'ok',
    app: 'FirstCare Africa',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    anthropicConfigured: !!process.env.ANTHROPIC_API_KEY
  })
}
