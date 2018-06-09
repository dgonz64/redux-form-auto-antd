import React from 'react'

import { Form as AntForm } from 'antd'

export const Form = ({
  className,
  config: {
    horizontal,
    inline,
  },
  children
}) => {
  const layout = {
    horizontal,
    inline
  }

  return (
    <AntForm
      className={className}
      layout={{horizontal, inline}}
    >
      {children}
    </AntForm>
  )
}

