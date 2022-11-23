export const BRAND_LIFESTYLE_NAME = 'lifestyle'

export function getBrandName(): string {
  return process.env.NEXT_PUBLIC_BRAND || 'tech'
}
