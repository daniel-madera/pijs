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

  keypress = e => {
    const { validate } = this.props
    if (!validate(e.key)) {
      e.preventDefault()
    }
  }

  validate = e => {
    var newState = this.state
    const value = e.target.value

    if (!validate(value)) {
      newState.validation = 'error'
      newState.help = 'Hodnota obsahuje neplatné znaky. Povolené znaky jsou pouze textové znaky'
      this.setState(newState)
      return false
    }

    newState.validation = 'success'
    newState.help = null
    this.setState(newState)
    return false

  }

  render() {
    const { validation, help } = this.state
    const { label, inputRef } = this.props
    let dataValidation = validation !== 'error'

    return (
      <FormGroup validationState={validation}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl type="text" inputRef={inputRef} data-validation={dataValidation} onKeyPress={this.keypress} />
        <FormControl.Feedback/>
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    )
  }
}
