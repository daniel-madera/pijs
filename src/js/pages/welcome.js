import React from 'react'
import { observer, inject } from 'mobx-react'

import { Grid, Row, Col, Table, Button } from 'react-bootstrap'

import Img from 'react-image-load';

@inject('userStore', 'appStore', 'routerStore')
@observer
export default class Welcome extends React.Component {

  render() {
    const { apiURL } = this.props.appStore
    const { push } = this.props.routerStore

    return (
      <Grid fluid>
      <Row>
        <Col xs={6} md={6}>
          <h1>Vítejte v aplikaci online cizojazyčného slovníčku</h1>
          <br />
          <p>
            <Button type="button" className="half-width btn btn-primary btn-lg" onClick={() => push('/auth')}>Přihlásit</Button>
            <Button type="button" className="half-width btn btn-default btn-lg" onClick={() => push('/register')}>Registrovat</Button>
          </p>
          <br />
          <div className="list-group-item">
            <div className="list-group">
              <h4 className="list-group-item-heading">Jak jste na tom s cizojazyčnou slovní zásobou?</h4>
              <p className="list-group-item-text">Pokud máte zájem si procvičit slovíčka z cizích jazyků, neváhejte se registrovat.</p>
            </div>
          </div>
          <div className="list-group-item">
            <div className="list-group">
              <h4 className="list-group-item-heading">Jste tu poprvé?</h4>
              <p className="list-group-item-text">Pokud nevíte kudy a kam, začněte vytvořením testu z již hotové učebnice.</p>
            </div>
          </div>
          <div className="list-group-item">
            <div className="list-group">
              <h4 className="list-group-item-heading">Nenaleznete vaši učebnici?</h4>
              <p className="list-group-item-text">Můžete si vytvořit vlastní. :) Vaše učebnice budou automaticky sdíleny pro ostatní uživatele.</p>
            </div>
          </div>
          <div className="list-group-item">
            <div className="list-group">
              <h4 className="list-group-item-heading">Jste součástí třídy?</h4>
              <p className="list-group-item-text">Pokud víte jméno třídy a heslo pro vstup, v sekci "Třídy" se můžete přihlásit.</p>
            </div>
          </div>
          <div className="list-group-item">
            <div className="list-group">
              <h4 className="list-group-item-heading">Efektivní připomínání...</h4>
              <p className="list-group-item-text">Nezapomeňte kontrolovat si již naučená slova připomínat v sekci "Připomenutí".</p>
            </div>
          </div>
        </Col>
        <Col xs={6} md={6}>
        <img src={apiURL + 'static/vocab-bgr.jpg'} />
        </Col>
      </Row>
    </Grid>
    )
  }
}
