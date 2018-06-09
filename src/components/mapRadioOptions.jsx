import React from 'react'

import { Field } from 'redux-form'
import { trModel } from 'redux-form-auto'
import { RadioField } from 'redux-form-antd'
import { Radio } from 'antd'
const AntRadioButton = Radio.Button

export const mapRadioOptions = ({
  name,
  schemaTypeName,
  fieldSchema: {
    options
  }
}) =>
  options.map(op => ({
    label: trModel(schemaTypeName, name, op),
    value: op
  }))

const RadioButton = ({
  input,
  meta,
  children
}) =>
  <AntRadioButton
    value={input.value}
  >
    {children}
  </AntRadioButton>
