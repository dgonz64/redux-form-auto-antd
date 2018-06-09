import React, { PureComponent } from 'react'
import { Field } from 'redux-form'
import { trModel } from 'redux-form-auto'

import {
  formItemLayout,
  tailFormItemLayout
} from './layouts'

const arrLast = arr => arr[arr.length - 1]

export class Fielder extends PureComponent {
  render() {
    const {
      name,
      children,
      config,
      config: {
        horizontal
      },
      elementOnly,
      schemaTypeName,
      labelOverride,
      useTailingLayout,
      fieldSchema,
      ...rest
    } = this.props

    const fieldName = arrLast(name.split('.'))
    const label = typeof labelOverride != 'undefined' ?
      labelOverride : trModel(schemaTypeName, fieldName, '_field')
    const style = elementOnly ? { margin: 0 } : {}
    const useLabel = elementOnly ? null : label
    const usePlaceholder = elementOnly ? label : null
    const layout = horizontal ?
      (useTailingLayout ?
        tailFormItemLayout() : formItemLayout())
      : {}

    return (
      <Field
        {...layout}
        {...rest}
        children={children}
        label={useLabel}
        placeholder={usePlaceholder}
        name={name}
        style={style}
        hasFeedback={false}
      />
    )
  }
}
