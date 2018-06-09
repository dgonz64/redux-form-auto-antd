# redux-form-auto-antd

`redux-form-auto-antd` allows your React application to automatically generate forms and validation code using [ReduxForm](https://github.com/erikras/redux-form/) for state management and [Ant Design](https://ant.design/docs/react/introduce) for component rendering. It uses [redux-form-antd](https://github.com/zhDmitry/redux-form-antd) to manage ReduxForm field connection.

It extends [redux-form-auto](https://github.com/dgonz64/redux-form-auto) and the API is identical ([documentation](https://dgonz64.github.io/redux-form-auto/)).

## Watch a demo

[Demo](https://dgonz64.github.io/redux-form-auto-antd/demo/)

## Installation

    $ npm install redux-form-auto-antd --save

## Usage

Just like `redux-form-auto` except you import this one. You are also in charge of importing `antd`.

```javascript
    import { Schema } from 'redux-form-auto-antd'

    const client = new Schema('client', {
      name: {
        type: 'string',
        required: true,
        max: 32
      },
      age: {
        type: 'number'
      }
    })

    const MyForm = ({ onSubmit }) =>
      <Autoform
        schema={client}
        onSubmit={onSubmit}
      />
```
