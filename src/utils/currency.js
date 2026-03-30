const LOCALE_CURRENCY = {
  'en-US': 'USD', 'es-US': 'USD',
  'en-GB': 'GBP', 'cy-GB': 'GBP',
  'en-CA': 'CAD', 'fr-CA': 'CAD',
  'en-AU': 'AUD',
  'en-IN': 'INR', 'hi-IN': 'INR', 'bn-IN': 'INR', 'ta-IN': 'INR', 'te-IN': 'INR', 'mr-IN': 'INR', 'gu-IN': 'INR', 'kn-IN': 'INR', 'ml-IN': 'INR',
  'en-SG': 'SGD', 'zh-SG': 'SGD',
  'de-DE': 'EUR', 'de-AT': 'EUR', 'fr-FR': 'EUR', 'es-ES': 'EUR', 'it-IT': 'EUR', 'nl-NL': 'EUR', 'pt-PT': 'EUR', 'fi-FI': 'EUR', 'el-GR': 'EUR', 'de': 'EUR', 'fr': 'EUR', 'es': 'EUR', 'it': 'EUR', 'nl': 'EUR', 'pt': 'EUR',
  'ja-JP': 'JPY', 'ja': 'JPY',
  'zh-CN': 'CNY', 'zh': 'CNY',
  'ko-KR': 'KRW', 'ko': 'KRW',
  'pt-BR': 'BRL',
  'en-NZ': 'NZD',
  'en-ZA': 'ZAR',
  'sv-SE': 'SEK', 'sv': 'SEK',
  'nb-NO': 'NOK', 'nn-NO': 'NOK', 'no': 'NOK',
  'da-DK': 'DKK', 'da': 'DKK',
  'pl-PL': 'PLN', 'pl': 'PLN',
  'cs-CZ': 'CZK', 'cs': 'CZK',
  'hu-HU': 'HUF', 'hu': 'HUF',
  'ro-RO': 'RON', 'ro': 'RON',
  'th-TH': 'THB', 'th': 'THB',
  'ms-MY': 'MYR', 'ms': 'MYR',
  'id-ID': 'IDR', 'id': 'IDR',
  'vi-VN': 'VND', 'vi': 'VND',
  'tr-TR': 'TRY', 'tr': 'TRY',
  'ar-SA': 'SAR', 'ar-AE': 'AED', 'ar-EG': 'EGP',
  'he-IL': 'ILS', 'he': 'ILS',
  'ru-RU': 'RUB', 'ru': 'RUB',
  'uk-UA': 'UAH', 'uk': 'UAH',
  'en-PH': 'PHP', 'fil-PH': 'PHP',
  'zh-TW': 'TWD',
  'zh-HK': 'HKD',
  'en-HK': 'HKD',
  'en-IE': 'EUR',
  'en-NG': 'NGN',
  'en-KE': 'KES',
  'en-PK': 'PKR', 'ur-PK': 'PKR',
  'bn-BD': 'BDT',
  'si-LK': 'LKR', 'ta-LK': 'LKR',
}

const COUNTRY_CURRENCY = {
  US: 'USD', UK: 'GBP', Canada: 'CAD', Australia: 'AUD',
  India: 'INR', Germany: 'EUR', France: 'EUR', Singapore: 'SGD',
}

function detectCurrency() {
  const locale = (typeof navigator !== 'undefined' && navigator.language) || 'en-US'
  // Try exact match first, then language-only prefix
  return LOCALE_CURRENCY[locale] || LOCALE_CURRENCY[locale.split('-')[0]] || 'USD'
}

function detectLocale() {
  return (typeof navigator !== 'undefined' && navigator.language) || 'en-US'
}

let _cached = null
function getCurrencyInfo() {
  if (_cached) return _cached
  const locale = detectLocale()
  const currency = detectCurrency()
  let symbol = '$'
  try {
    symbol = new Intl.NumberFormat(locale, { style: 'currency', currency })
      .formatToParts(0)
      .find(p => p.type === 'currency')?.value || '$'
  } catch { /* fallback */ }
  _cached = { locale, currency, symbol }
  return _cached
}

export function getLocaleCurrency() {
  return getCurrencyInfo().currency
}

export function getCurrencySymbol() {
  return getCurrencyInfo().symbol
}

export function getLocale() {
  return getCurrencyInfo().locale
}

export function formatCurrency(value, { maximumFractionDigits = 0, minimumFractionDigits } = {}) {
  const { locale, currency } = getCurrencyInfo()
  if (minimumFractionDigits !== undefined && minimumFractionDigits > maximumFractionDigits) {
    maximumFractionDigits = minimumFractionDigits
  }
  const opts = { style: 'currency', currency, maximumFractionDigits }
  if (minimumFractionDigits !== undefined) opts.minimumFractionDigits = minimumFractionDigits
  return value.toLocaleString(locale, opts)
}

export function formatCurrencyForCountry(value, country, { maximumFractionDigits = 0, minimumFractionDigits } = {}) {
  const currency = COUNTRY_CURRENCY[country] || 'USD'
  const localeMap = { USD: 'en-US', GBP: 'en-GB', CAD: 'en-CA', AUD: 'en-AU', INR: 'en-IN', EUR: 'de-DE', SGD: 'en-SG' }
  const locale = localeMap[currency] || 'en-US'
  if (minimumFractionDigits !== undefined && minimumFractionDigits > maximumFractionDigits) {
    maximumFractionDigits = minimumFractionDigits
  }
  const opts = { style: 'currency', currency, maximumFractionDigits }
  if (minimumFractionDigits !== undefined) opts.minimumFractionDigits = minimumFractionDigits
  return value.toLocaleString(locale, opts)
}

export function getCurrencySymbolForCountry(country) {
  const currency = COUNTRY_CURRENCY[country] || 'USD'
  const localeMap = { USD: 'en-US', GBP: 'en-GB', CAD: 'en-CA', AUD: 'en-AU', INR: 'en-IN', EUR: 'de-DE', SGD: 'en-SG' }
  const locale = localeMap[currency] || 'en-US'
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency })
      .formatToParts(0)
      .find(p => p.type === 'currency')?.value || '$'
  } catch { return '$' }
}
