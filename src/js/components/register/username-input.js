import React from 'react'
import { inject, observer } from 'mobx-react'

import { FormGroup, FormLabel, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap'

@inject('userStore')
@observer
export default class UsernameInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      validation: null,
      help: null
    }
  }

  isValid(username) {
    const re = /^[0-9a-zA-Z_.-]+$/
    return re.test(username)
  }

  keypress = e => {
    if (!this.isValid(e.key)) {
      e.preventDefault();
    }
  }

  validate = e => {
    const { userStore } = this.props
    var newState = this.state
    const username = e.target.value

    if (!this.isValid(username)) {
      newState.validation = 'error'
      newState.help = 'Hodnota obsahuje neplatné znaky. Povolené znaky jsou pouze alfanumerické, podtržítko, tečka a pomlčka.'
      this.setState(newState)
      return false
    }

    let validCallback = () => {
      newState.validation = 'success'
      newState.help = null
      this.setState(newState)
    }

    let invalidCallback = () => {
      newState.validation = 'error'
      newState.help = 'Toto uživatelské jméno je obsazené. Prosím zvolte jiné.'
      this.setState(newState)
    }
    userStore.validateUsername(e.target.value, validCallback, invalidCallback)
  }

  render() {
    const { validation, help } = this.state
    const { inputRef } = this.props

    return (
      <FormGroup validationState={validation}>
        <ControlLabel>Uživatelské jméno</ControlLabel>
        <FormControl type="text" inputRef={inputRef} onBlur={this.validate} onKeyPress={this.keypress} data-validation={validation !== 'error'} />
        <FormControl.Feedback/>
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    )
  }
}
