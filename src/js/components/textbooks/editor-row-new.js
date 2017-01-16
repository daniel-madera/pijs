import React from 'react'
import { observer, inject } from 'mobx-react'

import { FieldGroup } from 'react-bootstrap'
import { GlyphButton, SimpleSelect, SimpleInput } from '../others/form'

@inject('appStore', 'textbookStore')
@observer
export default class EditorRowNew extends React.Component {

  onClickAdd = (e) => {
    const { textbookStore } = this.props
    this.props.textbookStore.add({
      title: this.newTextbookTitleInput.value,
      language: this.newTextbookLanguageIdInput.value
    }, () => {
      this.props.appStore.addMessage('success',
        "Učebnice byla úspěšně vytvořena.")
    }, () => {
      this.props.appStore.addMessage('danger',
        "Učebnice nebyla vytvořena. Zkontrolujte, zda již stejný název učebnice neexistuje.")
    })
    this.newTextbookTitleInput.value = ''
  }

  render() {
    return (
      <tr>
        <td></td>
        <td>
          <SimpleInput
            className="full-width"
            inputRef={ref => this.newTextbookTitleInput = ref}
            name='title-new'
            placeholder="Název nové učebnice"
            type="text"
          />
        </td>
        <td>
          <SimpleSelect className="full-width" 
            options={this.props.appStore.languages}
            name='language-new'
            inputRef={ref => this.newTextbookLanguageIdInput = ref}
            placeholder="Vyberte jazyk"
            />
        </td>
        <td className="text-right">
          <GlyphButton onClick={this.onClickAdd} glyph='plus' />
        </td>
      </tr>
    )
  }
}
