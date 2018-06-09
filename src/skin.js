import { renderInputs, InputArrayWrap, trModel } from 'redux-form-auto'
import {
  TextField,
  NumberField,
  SelectField,
  CheckboxField,
  RadioField
} from 'redux-form-antd'
import { Radio } from 'antd'
import { Fielder } from './components/Fielder'
import { Field } from 'redux-form'

const RadioGroup = Radio.Group

import * as components from './components'

export const antSkin = {
  form: {
    component: components.Form,
    props: {}
  },
  string: {
    component: Fielder,
    props: {
      component: TextField
    }
  },
  number: {
    component: Fielder,
    props: {
      component: NumberField,
      parse: value => value ? Number(value) : ''
    }
  },
  array: {
    component: InputArrayWrap,
    props: props => {
      const {
        config = {},
        fieldSchema: { type }
      } = props

      const { arrayMode } = config
      const arrayHandler = arrayMode == 'table' ?
        components.InputArrayTable : components.InputArrayPanel

      return {
        ...props,
        arrayHandler,
        type: arrayMode,
        children: renderInputs({ schema: type[0], config })
      }
    }
  },
  schema: {
    component: components.Submodel
  },
  select: {
    component: Fielder,
    props: props => {
      const {
        fieldSchema: { options },
        schemaTypeName,
        field,
        name
      } = props

      return {
        ...props,
        component: SelectField,
        inputWrapper: components.InputWrapper,
        options: options.map(op => ({
          label: trModel(schemaTypeName, field, op),
          value: op
        }))
      }
    }
  },
  radios: {
    component: Fielder,
    props: props => ({
      ...props,
      component: RadioField,
      options: components.mapRadioOptions(props),
      button: true
    })
  },
  boolean: {
    component: Fielder,
    props: props => {
      const {
        schemaTypeName,
        field
      } = props

      return {
        ...props,
        component: components.Checkbox,
        labelOverride: '',
        useTailingLayout: true,
        children: trModel(schemaTypeName, field, '_field')
      }
    }
  }
}

