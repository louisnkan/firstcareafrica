export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 
  'https://firstcareafrica.vercel.app'

  // Emergency conditions
const emergencies = [
    'severe-bleeding', 'unconscious-person', 'choking',
    'seizure', 'childbirth', 'burns', 'fractures',
    'snake-bite', 'drowning', 'head-injury',
    'cardiac-event', 'anaphylaxis', 'broken-jaw',
    'stroke', 'tetanus', 'rabies-exposure'
  ]
  const sexualHealth = [
    'gonorrhoea', 'chlamydia', 'syphilis',
    'genital-herpes', 'hiv-basics', 'sti-prevention'
  ]
  // Categories
  const categories = [
    'emergency', 'acute', 'common',
    'womens-health', 'chronic', 'maternal-child'
  ]

  const emergencyUrls = emergencies.map(slug => ({
    url: `${baseUrl}/condition/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9
  }))

  const categoryUrls = categories.map(cat => ({
    url: `${baseUrl}/category/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0
    },
    {
      url: `${baseUrl}/triage`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/quick-reference`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7
    },
    ...categoryUrls,
    ...emergencyUrls,
    ...sexualHealth.map(slug => ({
      url: `${baseUrl}/condition/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    }))
  ]
