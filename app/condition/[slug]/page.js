import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'
import ConditionContent from '../../../components/ConditionContent'

function getConditionData(slug) {
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    return null
  }

  const categories = [
    'emergency',
    'acute',
    'common',
    'womens-health',
    'chronic',
    'maternal-child',
    'sexual-health'
  ]

  for (const category of categories) {
    const filePath = path.join(
      process.cwd(), 'content', category, `${slug}.json`
    )
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8')
      return JSON.parse(raw)
    }
  }
  return null
}

export const dynamic = 'force-static'
export async function generateStaticParams() {
  const fs = require('fs')
  const path = require('path')

  const categories = [
    'emergency', 'acute', 'common',
    'womens-health', 'chronic',
    'maternal-child', 'sexual-health'
  ]

  const slugs = []

  for (const category of categories) {
    const dirPath = path.join(
      process.cwd(), 'content', category
    )
    if (!fs.existsSync(dirPath)) continue
    const files = fs.readdirSync(dirPath)
    for (const file of files) {
      if (file.endsWith('.json')) {
        slugs.push({ slug: file.replace('.json', '') })
      }
    }
  }

  return slugs
}

export default function ConditionPage({ params }) {
  const condition = getConditionData(params.slug)

  if (!condition) notFound()

  return <ConditionContent condition={condition} />
}
