import React from 'react'
import { observer, inject } from 'mobx-react'

import { Alert, Form, FormGroup, FormControl, ControlLabel, Button, Row, Col, Grid, InputGroup, Glyphicon } from 'react-bootstrap'
import { GlyphButton } from '../others/form'

import QuestionerHints from './questioner-hints'

@inject('appStore', 'examStore', 'routerStore')
@observer
export default class QuestionerTemplate extends React.Component {


  answer = e => {
    e.preventDefault()

    var { examStore, appStore } = this.props

    if (this.inputAnswer.value === '') {
      appStore.addMessage('danger',
        "Odpovězte na otázku nebo zvolte \"Nevím\".")
      return
    }

    examStore.answer(this.inputAnswer.value, this.props.isRecall)

    let { selectedWord } = this.props.examStore

    // test is done or word is done
    if (!selectedWord || selectedWord.done) {
      appStore.addMessage('success',
        "Skvěle toto slovo jste zvládl/a! Nyní si ho podctivě opakujte pomocí připomínání slov.")
      this.props.appStore.soundNotify()
    }
  }

  skipAnswer = e => {
    e.preventDefault()
    var { examStore } = this.props
    examStore.answer('', this.props.isRecall)
  }

  nextWord = e => {
    e.preventDefault()
    var { examStore } = this.props
    this.inputAnswer.value = ''
    examStore.nextWord()
  }

  play = e => {
    const { sound } = this.props
    let a = new Audio(sound)
    a.play()
  }

  exit = e => {
    e.preventDefault()
    let success = () => {
      this.props.examStore.reset()
      this.props.routerStore.replace('/')
    }
    this.props.examStore.saveWords(success)
  }

  render() {
    const { lastAnswer, hintLevel } = this.props.examStore
    const { meaning, value, validation, definition, usage, pictureLink, sound } = this.props

    return (
      <div className="questioner">
        <div className="content">
            <Button className="show-hint pull-right" onClick={this.exit}>Ukončit testování</Button>
            <h4>Otázka</h4>
            <p>Překlad slova: <b>{meaning}</b></p>
            <Form>
              <FormGroup controlId="formInlineName" validationState={validation}>
              <ControlLabel>Vaše odpověď: </ControlLabel>
                <FormControl type="text" className="full-width" inputRef={ref => {this.inputAnswer = ref}} autoComplete="off"/>
                {!lastAnswer ?
                  <div>
                    <Button className="answer-block" bsStyle="warning" onClick={this.skipAnswer}>Nevím</Button>
                    <Button className="answer-block" type="submit" bsStyle="success" onClick={this.answer}><Glyphicon glyph="ok"/></Button>
                  </div>
                  :
                  <div>
                    <div className="answer-block">
                      Správná odpověď: {value} 
                      {sound && <GlyphButton className="indent-left-small" onClick={this.play} glyph="volume-up" title="Přehrát" />}
                    </div>
                    <Button className="answer-block" type="submit" bsStyle="default" onClick={this.nextWord}>Další</Button>
                  </div>
                }
              </FormGroup>
            </Form>
            <QuestionerHints definition={definition} usage={usage} value={value} inputAnswer={this.inputAnswer} />
        </div> 
        <div className="picture">
          {pictureLink && <img src={pictureLink} width="100%"/>}
        </div>
      </div>
    )
  }
}
