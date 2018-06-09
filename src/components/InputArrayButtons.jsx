import React from 'react'
import { Button } from 'antd'
import { tr } from 'redux-form-auto'

export const renderRemove = ({
  onRemove,
  fields,
  idx
}) =>
  <Button
    onClick={onRemove.bind(null, fields, idx)}
    icon="delete"
  >
    {tr('remove')}
  </Button>

export const renderAdd = ({
  schemaTypeName,
  fields,
  onAdd,
  newObject
}) => {
  const boundAdd = onAdd.bind(null, fields, newObject)

  return (
    <Button
      onClick={boundAdd}
      icon="plus-circle-o"
    >
      {tr('add')}
    </Button>
  )
}
