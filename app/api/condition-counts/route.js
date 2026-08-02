import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const CATEGORY_FOLDERS = [
  'emergency',
  'acute',
  'common',
  'womens-health',
  'chronic',
  'maternal-child',
  'sexual-health'
]

export async function GET() {
  const counts = {}

  for (const folder of CATEGORY_FOLDERS) {
    try {
      const dirPath = path.join(process.cwd(), 'content', folder)
      const files = fs.readdirSync(dirPath).filter((f) => f.endsWith('.json'))
      counts[folder] = files.length
    } catch {
      // Folder missing or unreadable — leave it out,
      // the client keeps its fallback number for this one
    }
  }

  return NextResponse.json(counts, {
    headers: {
      'Cache-Control': 's-maxage=3600, stale-while-revalidate'
    }
  })
}
