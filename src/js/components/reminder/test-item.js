import React from 'react'
import { observer, inject } from 'mobx-react'

import { Col, Grid, Row, Button, Table, Form } from 'react-bootstrap'
import { SimpleInput, GlyphButton } from '../others/form'

@inject('reminderStore', 'appStore')
@observer
export default class TestPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      className: '',
      done: false,
      word: props.word
    }
  }

  check = e => {
    const { word, reminderStore } = this.props
    const value = this.input.value.toLowerCase()

    if (!this.input.value || this.state.done) return false

    if (value.levenshtein(word.value.toLowerCase()) < 1) {
      let component = this

      reminderStore.remind(word, true, () => {
        component.setState({
          word: word
        })
      })

      this.setState({
        className: 'success',
        done: true
      })
    } else {

      let component = this

      reminderStore.remind(word, false, () => {
        component.setState({
          word: word
        })
      })

      this.setState({
        className: 'danger',
        done: true
      })
    }
  }

  onKeyUp = e => {
    if (e.keyCode == 13) {
      this.check()
    }
  }

  play = e => {
    const { apiURL } = this.props.appStore
    const url = apiURL + this.props.word.sound
    let a = new Audio(url)
    a.play()
  }

  render = () => {
    const { word } = this.state
    return (
      <tr key={word.id} className={this.state.className}>
        <td>{word.meaning}</td>
        <td>{word.lang}</td>
        <td><SimpleInput inputRef={ref => this.input = ref} onKeyUp={this.onKeyUp} autoComplete="off" /></td>
        <td>{!this.state.done ? 
          <GlyphButton glyph="check" placeholder={"Překlad slova '" + word.meaning + "'"} onClick={this.check}/> : 
          (word.sound && <GlyphButton onClick={this.play} glyph="volume-up" title="Přehrát" />)
        }</td>
        <td>{word.following_reminder}</td>
      </tr>
    )
  }
}
