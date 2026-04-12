import fs from 'fs'
import path from 'path'

// In-memory search index — built once per server instance
let cachedIndex = null
let cacheBuiltAt = null
const CACHE_TTL_MS = 10 * 60 * 1000 // 10 minutes

function buildSearchIndex() {
  const categories = [
    'emergency',
    'acute',
    'common',
    'womens-health',
    'chronic',
    'maternal-child',
    'sexual-health'
  ]

  const index = []

  for (const category of categories) {
    const dirPath = path.join(process.cwd(), 'content', category)
    if (!fs.existsSync(dirPath)) continue

    const files = fs.readdirSync(dirPath)

    for (const file of files) {
      if (!file.endsWith('.json')) continue
      try {
        const raw = fs.readFileSync(
          path.join(dirPath, file), 'utf-8'
        )
        const data = JSON.parse(raw)

        // Skip placeholder content
        if (data.steps?.[0] === 'Content coming in Phase C.') continue

        index.push({
          id: data.id,
          title: data.title,
          summary: data.summary,
          icon: data.icon,
          category: data.category,
          severity: data.severity,
          color: data.color,
          searchText: [
            data.title,
            data.summary,
            ...(data.steps || []),
            ...(data.warnings || []),
            ...(data.redFlags || [])
          ].join(' ').toLowerCase()
        })
      } catch {
        continue
      }
    }
  }

  return index
}

function getIndex() {
  const now = Date.now()
  // Rebuild if cache is stale or missing
  if (
    !cachedIndex ||
    !cacheBuiltAt ||
    now - cacheBuiltAt > CACHE_TTL_MS
  ) {
    cachedIndex = buildSearchIndex()
    cacheBuiltAt = now
  }
  return cachedIndex
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')?.toLowerCase().trim()

    if (!query || query.length < 2) {
      return Response.json(
        { results: [] },
        {
          headers: {
            'Cache-Control': 'public, max-age=60'
          }
        }
      )
    }

    const index = getIndex()
    const words = query.split(' ').filter(w => w.length > 1)

    const results = index
      .filter(item =>
        words.every(word => item.searchText.includes(word))
      )
      .map(item => ({
        id: item.id,
        title: item.title,
        summary: item.summary,
        icon: item.icon,
        category: item.category,
        severity: item.severity,
        color: item.color
      }))
      .sort((a, b) => {
        const aTitle = a.title.toLowerCase().includes(query)
        const bTitle = b.title.toLowerCase().includes(query)
        if (aTitle && !bTitle) return -1
        if (!aTitle && bTitle) return 1
        return 0
      })
      .slice(0, 8)

    return Response.json(
      { results },
      {
        headers: {
          // Cache search results for 5 minutes in browser
          // and on Vercel CDN edge
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
        }
      }
    )

  } catch (error) {
    console.error(JSON.stringify({
      event: 'search_error',
      error: error?.message || 'unknown',
      timestamp: new Date().toISOString()
    }))
    return Response.json(
      { error: 'Search unavailable', results: [] },
      { status: 500 }
    )
  }
}
