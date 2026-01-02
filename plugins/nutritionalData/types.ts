import {Path} from 'sanity'

export type NutritionDataFunc = (USDAData: USDAFood, path: Path) => void

export interface Nutrient {
  nutrientNumber: string
  value: number
}

export interface USDAFood {
  fdcId: string
  description: string
  foodNutrients: Nutrient[]
  additionalDescriptions?: string
}
