import React, { Component } from 'react'
import {
  Autoform,
  addTranslations,
  setLanguageByName
} from 'redux-form-auto-antd'
import { Row, Col, Card } from 'antd'

import { DemoConfig } from './DemoConfig'

import { computers } from '../model'

// FIXME Probably bad babel-plugin-input configuration
// (probable because library transpilation)
import 'antd/es/form/style/index.less'
import 'antd/es/input/style/index.less'
import 'antd/es/input-number/style/index.less'
import 'antd/es/button/style/index.less'
import 'antd/es/radio/style/index.less'
import 'antd/es/select/style/index.less'
import 'antd/es/checkbox/style/index.less'
import 'antd/es/table/style/index.less'
import 'antd/es/pagination/style/index.less'

setLanguageByName('en')
addTranslations({
  warning: {
    max: 'It\'s convenient this field is less than __max__ long'
  },
  models: {
    harddisks: {
      serial: 'Serial',
      capacity: {
        _field: 'Storage capacity',
        '1': '1 Gb',
        '2': '2 Gb',
        '4': '4 Gb',
      },
      works: 'Works',
    },
    computers: {
      model: 'Model',
      age: 'Age',
      harddrives: 'Hard drives',
      kind: {
        _field: 'Form factor',
        desktop: 'Desktop',
        mobile: 'Mobile'
      },
    },
  }
})

const codeLink = () =>
  <a
    href='https://github.com/dgonz64/redux-form-auto-antd/demo/src/model.js'
  >
    Link to the schema
  </a>

export class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      formConfig: {}
    }
  }

  handleConfigChange = (newConfig) => {
    this.setState({ formConfig: newConfig })
  }

  render() {
    const { formConfig } = this.state

    return (
      <Row gutter={8}>
        <Col span={8}>
          <Card title="Form configuration" extra={codeLink()}>
            <DemoConfig
              onChange={this.handleConfigChange}
              config={formConfig}
            />
          </Card>
        </Col>
        <Col span={16}>
          <Card title="Computers">
            <Autoform
              schema={computers}
              config={formConfig}
            />
          </Card>
        </Col>
      </Row>
    )
  }
}
