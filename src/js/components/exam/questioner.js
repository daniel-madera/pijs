import React from 'react'
import { observer, inject } from 'mobx-react'
import api from '../../data/_api'

import QuestionerTemplate from './questioner-template'

@inject('examStore', 'appStore')
@observer
export default class Questioner extends React.Component {

  isRecall() {
    const { selectedWord } = this.props.examStore

    if (!selectedWord || !selectedWord.answers || selectedWord.answers.length <= 1) {
      return true
    }

    let answers = selectedWord.answers.slice(1).map(a => a.answer)
    let nLastCorrrect = 0
    let repeat = selectedWord.repeat

    for (var i = answers.length - 1; i >= 0; i--) {
      if (answers[i] != 'W') {
        nLastCorrrect++
      } else {
        break
      }
    }

    return (repeat - nLastCorrrect) % 2 === 1
  }

  render() {
    const { lastAnswer, selectedWord } = this.props.examStore
    const { apiURL } = this.props.appStore
    let isRecall = this.isRecall()

    if (lastAnswer) {
      isRecall = lastAnswer.isRecall
    }

    if (!selectedWord) {
      return <p>Není vybrané žádné slovo</p>
    }

    var validationState = undefined
    if (lastAnswer && lastAnswer.answer === 'R') {
      validationState = 'success'
    } else if (lastAnswer && lastAnswer.answer === 'A') {
      validationState = 'warning'
    } else if (lastAnswer && lastAnswer.answer === 'W') {
      validationState = 'error'
    }

    return (
      <QuestionerTemplate 
        meaning={isRecall ? selectedWord.meaning : selectedWord.value}
        value={isRecall ? selectedWord.value : selectedWord.meaning}
        validation={validationState}
        definition={isRecall ? selectedWord.definition : selectedWord.definition_m}
        usage={isRecall ? selectedWord.usage : selectedWord.usage_m}
        pictureLink={selectedWord.picture && apiURL + selectedWord.picture}
        isRecall={isRecall}
        sound={selectedWord.sound && apiURL + selectedWord.sound}
      />
    )
  }
}
