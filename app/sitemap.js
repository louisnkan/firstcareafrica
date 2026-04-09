export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ||
    'https://firstcareafrica.vercel.app'

  const emergencies = [
    'severe-bleeding',
    'unconscious-person',
    'choking',
    'seizure',
    'childbirth',
    'burns',
    'fractures',
    'snake-bite',
    'drowning',
    'head-injury',
    'cardiac-event',
    'anaphylaxis',
    'broken-jaw',
    'stroke',
    'tetanus',
    'rabies-exposure'
  ]

  const categories = [
    'emergency',
    'acute',
    'common',
    'womens-health',
    'chronic',
    'maternal-child',
    'sexual-health'
  ]

  const acuteConditions = [
    'malaria',
    'typhoid',
    'food-poisoning',
    'chest-pain',
    'severe-headache',
    'difficulty-breathing',
    'acute-abdominal-pain',
    'wound-infection',
    'eye-infection',
    'hypertensive-crisis',
    'dizziness',
    'body-heaviness'
  ]

  const commonConditions = [
    'common-cold',
    'sore-throat',
    'ear-infection',
    'skin-rash',
    'toothache',
    'muscle-cramps',
    'constipation',
    'insect-bites',
    'minor-burns',
    'period-cramps',
    'back-pain',
    'migraine',
    'peptic-ulcer'
  ]

  const womensHealth = [
    'dysmenorrhoea',
    'vaginal-discharge',
    'ovulation-pain',
    'heavy-bleeding',
    'uti-women',
    'breast-concerns',
    'pregnancy-warning-signs',
    'hyperventilation'
  ]

  const chronicConditions = [
    'hypertension',
    'diabetes',
    'asthma',
    'sickle-cell',
    'epilepsy',
    'malaria-prevention',
    'mental-health',
    'chronic-pain'
  ]

  const maternalChild = [
    'pediatric-fever',
    'dehydration-child',
    'newborn-care',
    'neonatal-jaundice',
    'childhood-malnutrition',
    'breastfeeding',
    'childhood-diarrhoea',
    'childhood-vaccinations',
    'postpartum-care',
    'child-respiratory'
  ]

  const sexualHealth = [
    'gonorrhoea',
    'chlamydia',
    'syphilis',
    'genital-herpes',
    'hiv-basics',
    'sti-prevention'
  ]

  const allConditions = [
    ...emergencies,
    ...acuteConditions,
    ...commonConditions,
    ...womensHealth,
    ...chronicConditions,
    ...maternalChild,
    ...sexualHealth
  ]

  const categoryUrls = categories.map(cat => ({
    url: `${baseUrl}/category/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8
  }))

  const conditionUrls = allConditions.map(slug => ({
    url: `${baseUrl}/condition/${slug}`,
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
    ...conditionUrls
  ]
}
