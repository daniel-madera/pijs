import React from 'react'
import { inject, observer } from 'mobx-react'

import { Grid, Row } from 'react-bootstrap'

import TestPage from '../components/exam/test-page'
import TestSelector from '../components/exam/test-selector'

@inject('examStore')
@observer
export default class Exam extends React.Component {

  render() {
    const { words } = this.props.examStore
    let page

    if (words && words.length !== 0) {
      page = <TestPage />
    } else {
      page = <TestSelector />
    }

    return page
  }
}
