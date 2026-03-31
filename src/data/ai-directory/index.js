import writing from './writing.js'
import coding from './coding.js'
import imageGeneration from './imageGeneration.js'
import video from './video.js'
import audio from './audio.js'
import seo from './seo.js'
import productivity from './productivity.js'
import research from './research.js'
import presentation from './presentation.js'
import dataAnalysis from './dataAnalysis.js'
import customerSupport from './customerSupport.js'
import marketing from './marketing.js'

export const aiCategories = [
  { id: 'writing', name: 'Writing', emoji: '✍️' },
  { id: 'coding', name: 'Coding', emoji: '💻' },
  { id: 'image-generation', name: 'Image Generation', emoji: '🎨' },
  { id: 'video', name: 'Video', emoji: '🎬' },
  { id: 'audio', name: 'Audio', emoji: '🎵' },
  { id: 'seo', name: 'SEO', emoji: '🔍' },
  { id: 'productivity', name: 'Productivity', emoji: '⚡' },
  { id: 'research', name: 'Research', emoji: '🔬' },
  { id: 'presentation', name: 'Presentation', emoji: '📊' },
  { id: 'data-analysis', name: 'Data Analysis', emoji: '📈' },
  { id: 'customer-support', name: 'Customer Support', emoji: '💬' },
  { id: 'marketing', name: 'Marketing', emoji: '📣' },
]

export const aiTools = [
  ...writing,
  ...coding,
  ...imageGeneration,
  ...video,
  ...audio,
  ...seo,
  ...productivity,
  ...research,
  ...presentation,
  ...dataAnalysis,
  ...customerSupport,
  ...marketing,
]

export const aiPricingOptions = ['free', 'freemium', 'paid', 'open-source']
export const aiPlatformOptions = ['web', 'desktop', 'api', 'mobile']
export const aiBadgeOptions = ['popular', 'new', 'editorsPick']

export function getAiToolById(id) {
  return aiTools.find((t) => t.id === id)
}

export function getAiToolsByCategory(categoryId) {
  return aiTools.filter((t) => t.category === categoryId)
}

export function getAiAlternatives(tool) {
  if (!tool?.alternatives?.length) return []
  return tool.alternatives.map((id) => aiTools.find((t) => t.id === id)).filter(Boolean)
}

export function getAllAiTags() {
  const tagMap = {}
  for (const tool of aiTools) {
    for (const tag of tool.tags || []) {
      tagMap[tag] = (tagMap[tag] || 0) + 1
    }
  }
  return Object.entries(tagMap)
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }))
}

export const AI_DIRECTORY_LAST_UPDATED = '2026-03-31'
