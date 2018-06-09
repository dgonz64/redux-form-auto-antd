import React, { cloneElement, Component } from 'react'
import PropTypes from 'prop-types'

import { Card } from 'antd'
import { renderInputs, trModel } from 'redux-form-auto'

export const Submodel = ({
  name,
  config = {},
  fieldSchema: { type },
  schemaTypeName
}) =>
  <Card
   title={trModel(schemaTypeName, name)}
 >
    {renderInputs({ schema: type, config, parent: name })}
 </Card>
