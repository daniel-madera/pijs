import React from 'react'
import { observer, inject } from 'mobx-react'

import { FieldGroup } from 'react-bootstrap'
import { GlyphButton, SimpleSelect, SimpleInput } from '../others/form'

@inject('appStore', 'groupStore')
@observer
export default class EditorRowLoggedNew extends React.Component {

  onClickSignIn = (e) => {
    const { groupStore } = this.props

    let success = () => {
      this.props.appStore.addMessage('success', "Třída byla úspěšně přidána.")
      this.nameInput.value = ''
      this.passwordInput.value = ''
    }

    let failure = () => {
      this.props.appStore.addMessage('danger', "Třída nebyla přidána.")
    }

    let data = {
      name: this.nameInput.value,
      password: this.passwordInput.value
    }

    this.props.groupStore.signIn(data, success, failure)
  }

  render() {
    return (
      <tr>
        <td></td>
        <td></td>
        <td>
          <SimpleInput
            className="full-width"
            placeholder={"Jméno pro vstup"}
            inputRef={ref => this.nameInput = ref}
            type="text"
          />
        </td>
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
          <GlyphButton onClick={this.onClickSignIn} glyph='log-in' />
        </td>
      </tr>
    )
  }
}
