import React from 'react'
import { inject, observer } from 'mobx-react'

import { ListGroup, ListGroupItem, Button, Glyphicon } from 'react-bootstrap'

import TestWordsListItem from './test-words-list-item'

@inject('testEditorStore')
@observer
export default class TestEditor extends React.Component {

  saveTestWords = () => {
    this.props.testEditorStore.saveTestWords()
  }

  render() {
    const { testWords, areWordsChanged } = this.props.testEditorStore

    const saveButton = (
      <Button bsStyle={'success'} className="full-width" onClick={this.saveTestWords}>Uložit změny v testu</Button>
    )

    return (
      <div>
        <h4>Aktuálně v testu</h4>
        {areWordsChanged && saveButton}
        {testWords.length > 0 ?          
          <ListGroup>
            {testWords.map(w => <TestWordsListItem word={w} key={w.id} />)}
          </ListGroup>
          : <p>V testu nemáte zařazená žádná slova.</p>
        }
      </div>
    )
  }
}
