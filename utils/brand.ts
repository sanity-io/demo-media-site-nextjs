export const BRAND_LIFESTYLE_NAME = 'lifestyle'

export function getBrandName(): string {
  return process.env.NEXT_PUBLIC_BRAND || 'tech'
}

export function isLifestyle(): boolean {
  return getBrandName() === BRAND_LIFESTYLE_NAME
}
