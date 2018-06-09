import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Form } from 'antd'

const FormItem = Form.Item

export const InputWrapper = ({
  label,
  horizontal,
  required,
  elementOnly,
  children,
  errorMessage,
  warningMessage,
}) => {
  const feedback = errorMessage || warningMessage
  const validateStatus = errorMessage ?
    'error' : (warningMessage ? 'warning' : null)
  const useLabel = elementOnly ? '' : label
  const style = elementOnly ? { margin: 0 } : {}

  return (
    <FormItem
      style={style}
      hasFeedback={Boolean(feedback)}
      extra={feedback}
      label={useLabel}
      required={required}
      validateStatus={validateStatus}
    >
      {children}
    </FormItem>
  )
}

InputWrapper.propTypes = {
  label: PropTypes.string,
  horizontal: PropTypes.bool,
  required: PropTypes.bool,
  elementOnly: PropTypes.bool,
  inline: PropTypes.bool,
  children: PropTypes.node.isRequired,
  errorMessage: PropTypes.any,
  warningMessages: PropTypes.any,
}

