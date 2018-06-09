import React from 'react'

import { trModel } from 'redux-form-auto'
// import { renderLectures } from './renderLectures'
import { renderRemove, renderAdd } from './InputArrayButtons'

import { Card } from 'antd'

export const renderFields = props => {
  const { fields, onRemove, children } = props
  const total = fields.length

  return fields.map((field, idx) =>
    <Card
      key={idx}
      extra={renderRemove({ fields, onRemove, idx })}
      type="inner"
    >
      {props.instrumentChildren({ field, idx, total, children })}
    </Card>
  )
}

export const InputArrayPanel = (props) => {
  const { meta, schemaTypeName, fields } = props
  const title = trModel(schemaTypeName, fields.name)

  return (
    <Card title={title} extra={renderAdd(props)}>
      
      {renderFields(props)}
    </Card>
  )
}
