import fs from 'node:fs'
import tools, { categories } from '../src/data/tools.js'

const today = '2026-03-01'
const urls = []

function add(loc, changefreq, priority) {
  urls.push({ loc, changefreq, priority, lastmod: today })
}

add('https://untrackt.com/', 'weekly', '1.0')
add('https://untrackt.com/favorites', 'monthly', '0.3')
categories.forEach((category) => add(`https://untrackt.com/category/${category.id}`, 'monthly', '0.8'))
tools.forEach((tool) => add(`https://untrackt.com${tool.path}`, 'monthly', '0.7'))
add('https://untrackt.com/about', 'yearly', '0.3')
add('https://untrackt.com/privacy', 'yearly', '0.2')
add('https://untrackt.com/terms', 'yearly', '0.2')

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map((url) => `  <url>\n    <loc>${url.loc}</loc>\n    <changefreq>${url.changefreq}</changefreq>\n    <priority>${url.priority}</priority>\n    <lastmod>${url.lastmod}</lastmod>\n  </url>`),
  '</urlset>',
].join('\n')

fs.writeFileSync('./public/sitemap.xml', xml, 'utf8')
console.log(`Generated sitemap with ${urls.length} URLs.`)
