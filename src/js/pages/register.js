import React from 'react'
import { inject, observer } from 'mobx-react'

import { Grid, Row, Form, FormGroup, FormLabel, FormControl, ControlLabel, Button, Col, Glyphicon } from 'react-bootstrap'

import UsernameInput from '../components/register/username-input'
import PasswordInputs from '../components/register/password-inputs'
import SimpleInput from '../components/register/simple-text-input'

@inject('userStore', 'appStore', 'routerStore')
@observer
export default class Register extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { userStore } = this.props
    userStore.logout()
  }

  isFormValid() {
    console.log(this.usernameInput.dataset.validation, this.passwordInput.dataset.validation, this.firstNameInput.dataset.validation, this.lastNameInput.dataset.validation)
    if (this.usernameInput.dataset.validation !== 'true')
      return false

    if (this.passwordInput.dataset.validation !== 'true')
      return false

    if (this.firstNameInput.dataset.validation !== 'true')
      return false

    if (this.lastNameInput.dataset.validation !== 'true')
      return false

    return true
  }

  submit = e => {
    const { appStore, userStore } = this.props
    const { push } = this.props.routerStore

    if (!this.isFormValid()) {
      appStore.addMessage('danger',
        "Formulář není validní. Prosím opravte zvýrazněné položky.")
      return
    }

    let data = {
      username: this.usernameInput.value,
      password: this.passwordInput.value,
      first_name: this.firstNameInput.value,
      last_name: this.lastNameInput.value,
    }

    let success = () => {
      push('/auth')
      appStore.addMessage('success', "Uživatel byl úspěšně registrován. Nyní se můžete přihlásit.")
    }

    let failure = () => {
      appStore.addMessage('danger', "Registrace selhala. Zkuste zvolit jiné uživatelské jméno.")
    }

    userStore.register(data, success, failure)
  }

  render() {

    let validate = function(text) {
      const re = /^[a-zA-Z\u00C0-\u017F]+$/
      return re.test(text)
    }

    return <Grid fluid>
        <Row>
          <Col xs={3} md={3} />
          <Col xs={12} md={6}>

           <Form className="tiny">
            <UsernameInput inputRef={ref => this.usernameInput = ref} />
            <PasswordInputs inputRef={ref => this.passwordInput = ref} />
            <SimpleInput inputRef={ref => this.firstNameInput = ref} validate={validate} label="Jméno" />
            <SimpleInput inputRef={ref => this.lastNameInput = ref} validate={validate} label="Příjmení" />
            <Button onClick={this.submit}>Odeslat</Button>
          </Form>
        </Col>
        <Col xs={3} md={3} />
        </Row>
    </Grid>
  }
}
