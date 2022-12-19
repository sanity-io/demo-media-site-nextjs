import {config} from 'lib/config'

export const BRAND_LIFESTYLE_NAME = 'lifestyle'

export const getBrandName = (): string => config.brand

export function isLifestyle(): boolean {
  return getBrandName() === BRAND_LIFESTYLE_NAME
}
