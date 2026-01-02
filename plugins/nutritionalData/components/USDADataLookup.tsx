import {Autocomplete, Box, Card, Flex, Text} from '@sanity/ui'
import React, {useCallback, useEffect, useState} from 'react'
import {InputProps} from 'sanity'

import {NutritionDataFunc, USDAFood} from '../types'

interface ChangeParentProps {
  changeParent: NutritionDataFunc
}

interface USDAFoodOption {
  value: string
  payload: USDAFood
}

const USDADataLookup = (
  props: Omit<InputProps, 'renderDefault'> & ChangeParentProps
) => {
  const {changeParent, path, value} = props
  const optionsArray: USDAFoodOption[] = []

  const [query, setQuery] = useState('')
  const [options, setOptions] = useState(optionsArray)

  const handleChange = useCallback(
    (event: string) => {
      const food = options.find((option) => option.value === event)
      if (food && food.payload) {
        changeParent(food.payload, path)
      }
    },
    [options, changeParent, path]
  )

  useEffect(() => {
    const fetchUSDAData = async (input = '') => {
      //temp use of process.env key until we put it in sanity secrets
      //eslint-disable-next-line no-process-env
      const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${input}&pageSize=20&api_key=${process.env.NEXT_PUBLIC_USDA_API_KEY}`
      await fetch(url)
        .then((res) => res.json())
        .then((res) => res.foods)
        .then((foods: USDAFood[]) =>
          foods.map((food) => ({value: food.fdcId, payload: food}))
        )
        .then((foods) => setOptions(foods))
    }
    fetchUSDAData(query)
  }, [query, setOptions])

  const handleQueryChange = useCallback(
    (input: string | null) => input && setQuery(input),
    [setQuery]
  )

  const renderOption = useCallback(
    (option: USDAFoodOption) => (
      <Card as="button">
        <Flex align="center">
          <Box flex={1} padding={3}>
            <Text size={[2, 2, 3]}>{option.payload.description}</Text>
          </Box>
        </Flex>
      </Card>
    ),
    []
  )

  return (
    <Card>
      <Autocomplete
        id={'field-dataSourceDescription'}
        onChange={handleChange}
        onQueryChange={handleQueryChange}
        options={options || []}
        value={value as string}
        renderOption={renderOption}
      />
    </Card>
  )
}

export default USDADataLookup
