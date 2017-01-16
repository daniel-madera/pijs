import React from 'react'
import { inject, observer } from 'mobx-react'

import { ListGroup, ListGroupItem } from 'react-bootstrap'

import TestListItem from './test-list-item'

@inject('testEditorStore')
@observer
export default class TestEditor extends React.Component {

  render() {
    const { tests } = this.props.testEditorStore

    return (
      <div>
        <h4>Moje testy</h4> 
        <ListGroup> 
          {tests.map(t => <TestListItem key={t.id} test={t} />)} 
        </ListGroup>
      </div>
    )
  }
}
