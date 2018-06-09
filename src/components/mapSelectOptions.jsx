import React from 'react'
import { trModel } from 'redux-form-auto'
import { Select } from 'antd'

const { Option } = Select

export const mapSelectOptions = ({
  schemaTypeName,
  name,
  options
}) =>
  options.map(option =>
    <Option value={option}>
      {trModel(schemaTypeName, name, option)}
    </Option>
  )
