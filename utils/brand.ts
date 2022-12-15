import {env} from './env'

export const BRAND_LIFESTYLE_NAME = 'lifestyle'

export const getBrandName = (): string => env('NEXT_PUBLIC_BRAND') || 'tech'

export function isLifestyle(): boolean {
  return getBrandName() === BRAND_LIFESTYLE_NAME
}
