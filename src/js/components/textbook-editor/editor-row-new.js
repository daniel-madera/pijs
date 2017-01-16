import React from 'react'
import { observer, inject } from 'mobx-react'
import { Collapse } from 'react-bootstrap'

import { GlyphButton } from '../others/form'

import EditorRowInput from './editor-row-input'
import EditorRowPicture from './editor-row-picture'

@inject('appStore', 'textbookEditorStore')
@observer
export default class EditorRowNew extends React.Component {
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

  addWord = e => {
    let data = {
      value: this.valueInput.value,
      meaning: this.meaningInput.value,
      word_class: this.wordClassInput.value,
      difficulty: this.difficultyInput.value,
      definition: this.definitionInput.value,
      definition_m: this.definitionmInput.value,
      usage: this.usageInput.value,
      usage_m: this.usagemInput.value,
    }

    this.valueInput.value = ''
    this.meaningInput.value = ''
    this.wordClassInput.value = 1
    this.difficultyInput.value = 2
    this.definitionInput.value = ''
    this.definitionmInput.value = ''
    this.usageInput.value = ''
    this.definitionmInput.value = ''

    this.props.textbookEditorStore.addWord(data)
  }

  inputBlur = e => {
    let value = this.valueInput.value
    let meaning = this.meaningInput.value
    this.difficultyInput.value = value.wordDifficulty(meaning)
  }

  render() {
    const { difficulties, wordClasses } = this.props.appStore

    return (
      <div className="item">
        <EditorRowInput className="title" name="value" type="input" placeholder="Slovo v cizím jazyce" onBlur={this.inputBlur} inputRef={ref => this.valueInput = ref}/>
        <EditorRowInput className="title" name="meaning" type="input" placeholder="Slovo v mateřském jazyce" onBlur={this.inputBlur} inputRef={ref => this.meaningInput = ref} />
        <EditorRowInput className="wordClasses" name="word_class" options={wordClasses} type="select" inputRef={ref => this.wordClassInput = ref} />
        <EditorRowInput className="difficulty" name="difficulty" options={difficulties} type="select" inputRef={ref => this.difficultyInput = ref} />
        <div className="pull-right">
          <GlyphButton glyph="chevron-down" onClick={this.toggleOpen} />
          <GlyphButton glyph="plus" onClick={this.addWord} />
        </div>
        <Collapse in={this.state.open}>
          <div className="description" >
            <EditorRowInput className="text" name="definition" placeholder="Definice v cizím jazyce" type="input" inputRef={ref => this.definitionInput = ref} />
            <EditorRowInput className="text" name="usage" placeholder="Použití ve větě v cizím jazyce" type="input" inputRef={ref => this.usageInput = ref} />
          </div>
        </Collapse>
      </div>
    );
  }
}
