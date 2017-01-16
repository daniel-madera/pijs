import React from 'react'
import { observer, inject } from 'mobx-react'

import { FieldGroup } from 'react-bootstrap'
import { GlyphButton, SimpleSelect, SimpleInput } from '../others/form'

@inject('appStore', 'groupStore')
@observer
export default class EditorRowOwnedNew extends React.Component {

  onClickAdd = (e) => {
    const { groupStore } = this.props

    let success = () => {
      this.props.appStore.addMessage('success', "Třída byla úspěšně vytvořena.")
      this.titleInput.value = ''
      this.passwordInput.value = ''
    }

    let failure = () => {
      this.props.appStore.addMessage('danger', "Třída nebyla vytvořena.")
    }

    let data = {
      title: this.titleInput.value,
      password: this.passwordInput.value
    }

    this.props.groupStore.add(data, success, failure)
  }

  render() {
    return (
      <tr>
        <td></td>
        <td>
          <SimpleInput
            className="full-width"
            placeholder={"Název třídy"}
            inputRef={ref => this.titleInput = ref}
            type="text"
          />
        </td>
        <td></td>
        <td>
          <SimpleInput
            className="full-width"
            placeholder={"Heslo pro vstup"}
            inputRef={ref => this.passwordInput = ref}
            type="text"
          />
        </td>
        <td></td>
        <td></td>
        <td className="text-right">
          <GlyphButton onClick={this.onClickAdd} glyph='plus' />
        </td>
      </tr>
    )
  }
}
