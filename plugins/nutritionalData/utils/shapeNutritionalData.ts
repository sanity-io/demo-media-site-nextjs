import {Nutrient, USDAFood} from '../types'

interface NutritionalData {
  nutritionalInfo: {
    sugar: number
    fat: number
    kcal: number
  }
  dataSourceId: string
  dataSourceDescription: string
}

const shapeNutritionalData = (usdaFood: USDAFood): NutritionalData => {
  const getNutrientById = (id: string) => {
    const nutrient = usdaFood.foodNutrients.find(
      (foodNutrient: Nutrient) => foodNutrient.nutrientNumber === id
    )
    if (nutrient) {
      return nutrient.value
    }
    return 0
  }
  const data = {
    nutritionalInfo: {
      sugar: getNutrientById('269'),
      fat: getNutrientById('204'),
      kcal: getNutrientById('208'),
    },
    dataSourceId: usdaFood.fdcId,
    dataSourceDescription: usdaFood.description,
  }
  return data
}

export default shapeNutritionalData
