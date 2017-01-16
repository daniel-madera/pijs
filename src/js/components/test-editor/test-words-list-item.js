import React from 'react'
import { inject, observer } from 'mobx-react'

import { ListGroup, ListGroupItem, Button, Glyphicon } from 'react-bootstrap'


@inject('testEditorStore')
@observer
export default class TestWordsListItem extends React.Component {

  removeWord = e => this.props.testEditorStore.removeWordFromTest(this.props.word)

  render() {
    const { word } = this.props

    return (
      <ListGroupItem key={word.id}>
        {word.value} ({word.meaning}) 
        <Glyphicon glyph='trash' className="pointer pull-right" onClick={this.removeWord}/>
      </ListGroupItem>
    )
  }
}
