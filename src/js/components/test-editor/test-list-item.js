import React from 'react'
import { inject, observer } from 'mobx-react'

import { ListGroup, ListGroupItem } from 'react-bootstrap'

@inject('testEditorStore', 'testStore', 'routerStore')
@observer
export default class TestEditor extends React.Component {

  selectTest = e => {
    this.props.routerStore.replace('/tests/' + this.props.test.id)
    this.props.testEditorStore.selectTest(this.props.test)
  }

  render() {
    const { test } = this.props
    const { selectedTest } = this.props.testEditorStore

    return (
      <ListGroupItem onClick={this.selectTest} active={selectedTest === test}>
        {test.title}
      </ListGroupItem>
    )
  }
}
