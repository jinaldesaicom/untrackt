/**
 * Lightweight markdown-to-HTML renderer for preview panels.
 * Supports headings, bold, italic, lists, checkboxes, numbered lists, and tables.
 * Input is HTML-escaped to prevent XSS.
 */
export function renderMarkdown(md) {
  let html = md
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    // Tables
    .replace(/^\|(.+)\|\s*\n\|[-| :]+\|\s*\n((?:\|.+\|\s*\n?)*)/gm, (_, header, body) => {
      const ths = header.split('|').map(h => h.trim()).filter(Boolean).map(h => `<th class="px-3 py-1.5 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800">${h}</th>`).join('')
      const rows = body.trim().split('\n').map(row => {
        const tds = row.split('|').map(c => c.trim()).filter(Boolean).map(c => `<td class="px-3 py-1.5 text-xs text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">${c}</td>`).join('')
        return `<tr>${tds}</tr>`
      }).join('')
      return `<table class="w-full border-collapse rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 my-2"><thead><tr>${ths}</tr></thead><tbody>${rows}</tbody></table>`
    })
    // Headings
    .replace(/^### (.+)$/gm, '<h4 class="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-3 mb-1">$1</h4>')
    .replace(/^## (.+)$/gm, '<h3 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-1.5 border-b border-gray-200 dark:border-gray-700 pb-1">$1</h3>')
    .replace(/^# (.+)$/gm, '<h2 class="text-lg font-bold text-gray-900 dark:text-white mb-2">$1</h2>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-800 dark:text-gray-200">$1</strong>')
    // Checkboxes
    .replace(/^- \[ \] (.+)$/gm, '<li class="text-xs text-gray-600 dark:text-gray-400 ml-4 flex items-center gap-1.5"><span class="inline-block w-3.5 h-3.5 border border-gray-300 dark:border-gray-600 rounded"></span>$1</li>')
    .replace(/^- \[x\] (.+)$/gm, '<li class="text-xs text-green-600 dark:text-green-400 ml-4 flex items-center gap-1.5"><span class="inline-block w-3.5 h-3.5 bg-green-500 rounded text-white text-center text-[9px] leading-[14px]">✓</span>$1</li>')
    // Unordered list items
    .replace(/^- (.+)$/gm, '<li class="text-xs text-gray-600 dark:text-gray-400 ml-4 list-disc">$1</li>')
    // Numbered list items
    .replace(/^(\d+)\. (.+)$/gm, '<li class="text-xs text-gray-600 dark:text-gray-400 ml-4 list-decimal" value="$1">$2</li>')
    // Wrap consecutive <li> (with list-disc) in <ul>
    .replace(/((?:<li[^>]*list-disc[^>]*>.*<\/li>\s*)+)/g, '<ul class="my-1 space-y-0.5">$1</ul>')
    // Wrap consecutive <li> (with list-decimal) in <ol>
    .replace(/((?:<li[^>]*list-decimal[^>]*>.*<\/li>\s*)+)/g, '<ol class="my-1 space-y-0.5">$1</ol>')
    // Wrap consecutive checkbox <li> (flex) in <ul>
    .replace(/((?:<li[^>]*flex[^>]*>.*<\/li>\s*)+)/g, '<ul class="my-1 space-y-1">$1</ul>')
    // Line breaks for remaining lines
    .replace(/\n(?!<)/g, '<br/>')
  return html
}
