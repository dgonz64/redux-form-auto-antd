import React, { cloneElement } from 'react'

import { tr, trModel, renderInput } from 'redux-form-auto'
import { renderRemove, renderAdd } from './InputArrayButtons'
// import { renderLectures } from './renderLectures'

import { Form, Card, Table } from 'antd'

const renderFields = ({
  fields,
  onRemove,
  children,
  fieldSchema,
  schemaTypeName,
  fieldName
}) => {
  const other = fieldSchema.type[0]
  const total = fields.length

  const otherSchema = other.getSchema()
  const otherType = other.getType()
  const otherFields = Object.keys(otherSchema)
  const columns = otherFields.map((field, fieldIdx) => {
    return {
      title: trModel(otherType, field, '_field'),
      key: field,
      render: (text, record, lineIdx) => {
        const component = renderInput({
          field: field,
          fieldSchema: otherSchema[field],
          parent: record,
          schemaTypeName: otherType,
          elementOnly: true
        })

        const newName = `${record}.${field}`
        return cloneElement(component, {
          key: fieldIdx,
          inputArrayIdx: lineIdx,
          inputArrayTotal: total
        })
      }
    }
  })

  const columnsAndDelete = [
    ...columns,
    {
      title: tr('remove'),
      dataIndex: 'remove',
      key: 'remove',
      render: (text, record, idx) => {
        return renderRemove({
          onRemove,
          fields,
          idx
        })
      }
    }
  ]

  const data = fields.map(field => field)

  return (
    <Table columns={columnsAndDelete} dataSource={data} />
  )
}

export const InputArrayTable = (props) => {
  const { meta, schemaTypeName, fields } = props
  const title = trModel(schemaTypeName, fields.name)

  return (
    <Card title={title} extra={renderAdd(props)}>
      <Form layout="inline">
        {renderFields(props)}
      </Form>
    </Card>
  )
}

