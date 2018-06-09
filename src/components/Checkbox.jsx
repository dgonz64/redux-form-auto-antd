import React from 'react'
import { createComponent, customMap } from 'redux-form-antd'
import { Checkbox as AntCheckbox } from 'antd'

function mapFunction(mapProps, {
  input: {
    value,
    onChange
  }
}) {
  return {
    ...mapProps,
    onChange
  }
}

const checkboxFieldMap = customMap(mapFunction)

export const Checkbox = createComponent(AntCheckbox, checkboxFieldMap)
