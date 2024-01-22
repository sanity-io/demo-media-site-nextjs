import {Stack} from '@sanity/ui'
import React, {useCallback} from 'react'
import {
  FieldMember,
  InputProps,
  MemberField,
  ObjectInputProps,
  set,
  unset,
} from 'sanity'

import {NutritionDataFunc} from '../types'
import shapeNutritionalData from '../utils/shapeNutritionalData'
import USDADataLookup from './USDADataLookup'

const DESCRIPTION_FIELD_KEY = 'field-dataSourceDescription'

export default function NutritionalDataInput(props: ObjectInputProps) {
  const {members, onChange} = props

  const descriptionField = members.find(
    (field) => field.key === DESCRIPTION_FIELD_KEY
  )! as FieldMember
  const rawFields = descriptionField
    ? members.filter((member) => member.key !== DESCRIPTION_FIELD_KEY)
    : members

  const setNutritionData: NutritionDataFunc = useCallback(
    (usdaFood, path) => {
      const data = shapeNutritionalData(usdaFood)
      onChange(data ? set(data) : unset(path))
    },
    [onChange]
  )

  const renderUSDADataLookup = useCallback(
    (inputProps: Omit<InputProps, 'renderDefault'>) => {
      return <USDADataLookup {...inputProps} changeParent={setNutritionData} />
    },
    [setNutritionData]
  )

  return (
    <Stack>
      {descriptionField && (
        <MemberField
          {...props}
          member={descriptionField}
          renderInput={renderUSDADataLookup}
        />
      )}
      {props.renderDefault({...props, members: rawFields})}
    </Stack>
  )
}
