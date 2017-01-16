import React from 'react'
import { observer, inject } from 'mobx-react'

import { FieldGroup, Button, Glyphicon } from 'react-bootstrap'
import Confirm from 'react-confirm-bootstrap'
import { GlyphButton, SimpleSelect, SimpleInput } from '../others/form'

@inject('appStore', 'textbookStore', 'routerStore')
@observer
export default class EditorRow extends React.Component {

  onClickDelete = e => {
    let { textbook, textbookStore } = this.props
    textbookStore.remove(textbook)
  }

  onClickEdit = e => {
    const { push } = this.props.routerStore
    push('/textbooks/' + this.props.textbook.id)
  }

  updateTitle = e => {
    let { textbook, textbookStore } = this.props
    textbook.title = e.target.value
    textbookStore.patch(textbook, { title: textbook.title })
  }

  updateLanguage = e => {
    let { textbook, textbookStore } = this.props
    textbook.title = e.target.value
    textbookStore.patch(textbook, { language: textbook.title })
  }

  render() {
    const { textbook } = this.props

    return (
      <tr>
        <td>{textbook.id}</td>
        <td>
          <SimpleInput
            className="full-width"
            name={'title-' + textbook.id}
            placeholder={"Název učebnice"}
            defaultValue={textbook.title}
            type="text"
            onBlur={this.updateTitle}
          />
        </td>
        <td>
          <SimpleSelect 
            className="full-width" 
            options={this.props.appStore.languages}
            placeholder="Vyberte jazyk"
            value={textbook.language}
            onChange={this.updateLanguage}
            />
        </td>
        <td className="text-right">
          <Button className='icon' onClick={this.onClickEdit}>
            <Glyphicon glyph="pencil" />
          </Button>
          <Confirm
            onConfirm={this.onClickDelete}
            body="Opravdu chcete smazat učebnici? 
              Společně s učebnicí se smažou i její moduly a slovíčka."
            confirmText="Potvrdit odstranění"
            title="Odstranění učebnice">
            <Button className='icon'>
              <Glyphicon glyph="trash" />
            </Button>
          </Confirm>
        </td>
      </tr>
    )
  }
}
