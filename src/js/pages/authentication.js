import React from 'react'
import { observer, inject } from 'mobx-react'


import { Button, ControlLabel, Col, Form, FormControl, FormGroup, Grid, Row } from 'react-bootstrap'

@inject('appStore', 'userStore', 'routerStore')
@observer
export default class Authentication extends React.Component {

  componentDidMount() {
    const { userStore } = this.props
    userStore.logout()
  }

  onLoginClick = (e) => {
    e.preventDefault()
    const username = this.usernameInput.value
    const password = this.passwordInput.value
    const { appStore, userStore } = this.props
    const { push } = this.props.routerStore

    if (username == '' || password == '') {
      appStore.addMessage('warning',
        "Vyplňte uživatelské jméno i heslo.")
      return false
    }

    let success = () => {
      push('/')
    }

    let failure = () => {
      appStore.addMessage('danger',
        "Nepodařilo se přihlásit. Zkontrolujte vyplněné uživatelské jméno a heslo.")
    }

    userStore.login(username, password, success, failure)
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={3} md={3} />
          <Col xs={12} md={6}>
          <Form>
            <FormGroup controlId="usernameInputGroup">
              <ControlLabel>Uživatelské jméno</ControlLabel>
              <FormControl type="text" name="username" 
                inputRef={ref => this.usernameInput = ref} 
                placeholder="Zadejte uživatelské jméno" />
            </FormGroup>
            <FormGroup controlId="passwordInputGroup">
              <ControlLabel>Heslo</ControlLabel>
              <FormControl type="password" name="password" 
                inputRef={ref => this.passwordInput = ref} 
                placeholder="Zadejte heslo"/>
            </FormGroup>
            <Button type="submit" onClick={this.onLoginClick}>Přihlásit</Button>
          </Form>
          </Col>
          <Col xs={3} md={3} />
        </Row>
      </Grid>
    )
  }
}
