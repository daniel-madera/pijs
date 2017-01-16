import React from 'react'
import { observer, inject } from 'mobx-react'

import { FieldGroup } from 'react-bootstrap'
import { GlyphButton, SimpleSelect, SimpleInput } from '../others/form'

import EditorRowTextbook from './editor-row-textbook'

@inject('appStore', 'testStore', 'textbookPublicStore')
@observer
export default class EditorRowNew extends React.Component {

  onClickAdd = (e) => {
    const { testStore } = this.props
    const { selectedTextbook } = this.props.textbookPublicStore

    if (selectedTextbook === undefined) {
      this.props.appStore.addMessage('danger', "Není vybrána žádná učebnice jako zdroj slovíček.")
      return
    }

    let success = () => {
      this.props.appStore.addMessage('success', "Test byl úspěšně vytvořen.")
      this.titleInput.value = ''
      this.props.textbookPublicStore.selectedTextbook = undefined
    }

    let failure = () => {
      this.props.appStore.addMessage('danger', "Test nebyl vytvořena.")
    }

    let data = {
      title: this.titleInput.value,
      textbook: selectedTextbook,
      groups: []
    }

    this.props.testStore.add(data, success, failure)
  }

  render() {
    return (
      <tr>
        <td></td>
        <td>
          <SimpleInput
            className="full-width"
            inputRef={ref => this.titleInput = ref}
            name='title-new'
            placeholder="Název testu"
            type="text"
          />
        </td>
        <td>
          <EditorRowTextbook />
        </td>
        <td>
        </td>
        <td>
        </td>
        <td className="text-right">
          <GlyphButton onClick={this.onClickAdd} glyph='plus' />
        </td>
      </tr>
    )
  }
}
