import fs from 'fs'
import path from 'path'

// Build search index from all condition JSON files
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

        // Skip placeholders
        if (
          data.steps?.[0] === 'Content coming in Phase C.'
        ) continue

        index.push({
          id: data.id,
          title: data.title,
          summary: data.summary,
          icon: data.icon,
          category: data.category,
          severity: data.severity,
          color: data.color,
          // Search text combines title + summary + steps
          // for better matching
          searchText: [
            data.title,
            data.summary,
            ...(data.steps || []),
            ...(data.warnings || []),
            ...(data.redFlags || [])
          ]
            .join(' ')
            .toLowerCase()
        })
      } catch {
        // Skip malformed files silently
        continue
      }
    }
  }

  return index
}

// Cache the index — rebuilds on server restart only
let cachedIndex = null

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')?.toLowerCase().trim()

    if (!query || query.length < 2) {
      return Response.json({ results: [] })
    }

    // Build index if not cached
    if (!cachedIndex) {
      cachedIndex = buildSearchIndex()
    }

    // Split query into words for better matching
    const words = query.split(' ').filter(w => w.length > 1)

    const results = cachedIndex
      .filter(item => {
        // Match if ALL words appear in the search text
        return words.every(word =>
          item.searchText.includes(word)
        )
      })
      .map(item => ({
        id: item.id,
        title: item.title,
        summary: item.summary,
        icon: item.icon,
        category: item.category,
        severity: item.severity,
        color: item.color
      }))
      // Sort by relevance — title matches first
      .sort((a, b) => {
        const aTitle = a.title.toLowerCase().includes(query)
        const bTitle = b.title.toLowerCase().includes(query)
        if (aTitle && !bTitle) return -1
        if (!aTitle && bTitle) return 1
        return 0
      })
      .slice(0, 8) // max 8 results

    return Response.json({ results })

  } catch (error) {
    console.error('Search error:', error)
    return Response.json(
      { error: 'Search unavailable', results: [] },
      { status: 500 }
    )
  }
}
