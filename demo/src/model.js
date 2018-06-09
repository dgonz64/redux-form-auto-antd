import { Schema } from 'redux-form-auto-antd'

export const harddisks = new Schema('harddisks', {
  serial: {
    type: 'string'
  },
  capacity: {
    type: 'select',
    options: ['1', '2', '4']
  },
  works: {
    type: 'boolean'
  },
})

export const computers = new Schema('computers', {
  model: {
    type: 'string',
    max: 12,
    warning: {
      max: 6
    }
  },
  age: {
    type: 'number'
  },
  kind: {
    type: 'radios',
    options: ['desktop', 'mobile']
  },
  harddrives: {
    type: [harddisks]
  },
})


