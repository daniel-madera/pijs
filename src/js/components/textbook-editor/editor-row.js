import React from 'react'
import { observer, inject } from 'mobx-react'
import { Collapse } from 'react-bootstrap'

import { GlyphButton } from '../others/form'

import EditorRowInput from './editor-row-input'
import EditorRowPicture from './editor-row-picture'
import EditorRowSound from './editor-row-sound'

@inject('appStore', 'textbookEditorStore')
@observer
export default class EditorRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: this.props.open
    };
  }

  toggleOpen = e => {
    this.setState({
      open: !this.state.open
    })
  }

  remove = e => {
    const { word } = this.props
    this.props.textbookEditorStore.remove(word)
  }

  render() {
    const { difficulties, wordClasses } = this.props.appStore
    const { word } = this.props

    return (
      <div className="item">
        <EditorRowInput className="title" name="value" type="input" word={word} />
        <EditorRowInput className="title" name="meaning" type="input" word={word} />
        <EditorRowInput className="wordClasses" name="word_class" options={wordClasses} type="select" word={word} />
        <EditorRowInput className="difficulty" name="difficulty" options={difficulties} type="select" word={word} />
        <EditorRowPicture word={word} />
        <EditorRowSound word={word} />
        <div className="pull-right">
          <GlyphButton glyph="chevron-down" onClick={this.toggleOpen} />
          <GlyphButton glyph="trash" onClick={this.remove} />
        </div>
        <Collapse in={this.state.open}>
          <div className="description" >
            <EditorRowInput className="text" name="definition" placeholder="Definice v cizím jazyce" type="input" word={word} />
            <EditorRowInput className="text" name="usage" placeholder="Použití ve větě v cizím jazyce" type="input" word={word} />
          </div>
        </Collapse>
      </div>
    );
  }
}
