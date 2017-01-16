import React from 'react'
import { inject, observer } from 'mobx-react'

import { FormGroup, FormLabel, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap'

@inject('userStore')
@observer
export default class PasswordInputs extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      validation: null,
      validationRep: null,
      help: null,
      helpRep: null
    }
  }

  validate = e => {
    var newState = this.state
    const password = e.target.value

    if (password.length < 7) {
      newState.validation = 'error'
      newState.help = 'Heslo musí být minimálně 7 znaků dlouhé.'
      this.setState(newState)
      return false
    }

    if (!/[0-9]/.test(password)) {
      newState.validation = 'error'
      newState.help = 'Heslo musí obsahovat alespoň jednu číslici.'
      this.setState(newState)
      return false
    }

    if (!/[a-zA-Z]/.test(password)) {
      newState.validation = 'error'
      newState.help = 'Heslo musí obsahovat alespoň jedno písmeno.'
      this.setState(newState)
      return false
    }

    newState.validation = 'success'
    newState.help = ''
    this.setState(newState)
    return true
  }

  validateRep = e => {
    var newState = this.state
    const passwordRep = e.target.value
    const password = this.passwordInput.value

    if (password !== passwordRep) {
      newState.validationRep = 'error'
      newState.helpRep = 'Hesla se neshodují.'
      this.setState(newState)
      return false
    }

    newState.validationRep = 'success'
    newState.helpRep = ''
    this.setState(newState)
    return true
  }

  render() {
    const { validation, validationRep, help, helpRep } = this.state
    const { inputRef } = this.props
    let dataValidation = false

    if (validation !== 'error' && validationRep !== 'error') {
      dataValidation = true
    }

    return (
      <div>
        <FormGroup validationState={validation}>
          <ControlLabel>Heslo</ControlLabel>
          <FormControl type="password" inputRef={ref => this.passwordInput = ref} onChange={this.validate}/>
          <FormControl.Feedback />
          {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
        <FormGroup validationState={validationRep}>
          <ControlLabel>Potvrzení hesla</ControlLabel>
          <FormControl type="password" inputRef={inputRef} data-validation={dataValidation} onChange={this.validateRep}/>
          <FormControl.Feedback />
          {helpRep && <HelpBlock>{helpRep}</HelpBlock>}
        </FormGroup>
      </div>
    )
  }
}
