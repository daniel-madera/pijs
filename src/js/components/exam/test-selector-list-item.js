import React from 'react'
import { inject, observer } from 'mobx-react'

import { ListGroupItem } from 'react-bootstrap'


@inject('testSelectorStore', 'appStore')
@observer
export default class TestSelectorListItem extends React.Component {

  selectTest = e => {
    const { test } = this.props
    if (test.words_count - test.done_words_count <= 0) {
      if (test.words_count === 0) {
        this.props.appStore.addMessage('info', "Tento test nemá žádná slova.")
      } else {
        this.props.appStore.addMessage('info', "Skvěle! Zvládli jste všechna slova v tomto testu.")
      }

      return
    }

    this.props.testSelectorStore.selectedTest = this.props.test
  }

  render() {
    const { test } = this.props
    const { selectedTest } = this.props.testSelectorStore

    return (
      <ListGroupItem key={test.id} onClick={this.selectTest} active={selectedTest === test}>
        {test.textbook.title} / <strong>{test.title}</strong> <span className="pull-right">Zvládnutá slova: {test.done_words_count}/{test.words_count}</span>
      </ListGroupItem>
    )
  }
}
