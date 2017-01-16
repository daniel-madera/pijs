import React from 'react'
import { inject, observer } from 'mobx-react'

import { ListGroup, ListGroupItem } from 'react-bootstrap'

@inject('testEditorStore')
@observer
export default class WordsSelectorList extends React.Component {

  toggleSelect(word, e) {
    let { testWords } = this.props.testEditorStore
    this.props.testEditorStore.areWordsChanged = true

    if (!testWords.find(tw => tw.id === word.id)) {
      this.props.testEditorStore.testWords.push(word)
    } else {
      let i = testWords.findIndex(w => w.id === word.id)
      if (i >= 0) {
        testWords = testWords.splice(i, 1)
      }
    }
  }

  selectAll = e => {
    let { words, testWords } = this.props.testEditorStore
    let editor = this
    words.forEach(w => {
      if (!testWords.find(tw => tw.id === w.id)) {
        this.props.testEditorStore.areWordsChanged = true
        this.props.testEditorStore.testWords.push(w)
      }
    })
  }

  render() {
    const { words, testWords } = this.props.testEditorStore

    return <div>
      {words.length > 0 ?
        <ListGroup>
          <ListGroupItem onClick={this.selectAll}><b>Vybrat všechna</b></ListGroupItem>
          {words.map(w => 
            <ListGroupItem key={w.id} active={testWords.find(tw => tw.id === w.id)} onClick={this.toggleSelect.bind(this, w)}>
              {w.value} ({w.meaning})
            </ListGroupItem>)}
        </ListGroup> : <span>Modul nemá žádná slova.</span>
      }
    </div>
  }
}
