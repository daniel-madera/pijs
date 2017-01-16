import React from 'react'
import { observer, inject } from 'mobx-react'
import $ from 'jquery'

import { FormGroup } from 'react-bootstrap'
import { GlyphButton } from '../others/form'

@inject('appStore', 'textbookEditorStore')
@observer
export default class EditorRowPicture extends React.Component {
  constructor(props) {
    super(props)
    const { sound } = props.word

    this.state = {
      isSound: sound && sound.length > 0
    }
  }

  click = e => {
    const { word } = this.props
    const component = this


    if (this.state.isSound) {
      this.props.textbookEditorStore.removeSound(word, () => {
        component.setState({
          isSound: false
        })
      })
    } else {
      this.props.textbookEditorStore.saveSound(word, () => {
        component.setState({
          isSound: true
        })
      })
    }
  }

  play = e => {
    const { word } = this.props
    const { apiURL } = this.props.appStore
    const url = apiURL + word.sound
    let a = new Audio(url)
    a.play()
  }

  render() {
    let glyph = 'volume-off'
    let title = 'Získat nahrávku'

    if (this.state.isSound) {
      glyph = 'volume-up'
      title = 'Smazat nahrávku'
    }

    return <FormGroup className="sound">
      <GlyphButton onClick={this.click} glyph={glyph} tooltip={title} />
      {this.state.isSound && <GlyphButton onClick={this.play} glyph="play" tooltip="Přehát" />}
    </FormGroup>
  }
}
