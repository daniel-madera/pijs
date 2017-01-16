import React from 'react';
import { inject, observer } from 'mobx-react'

import { Alert, Col, Grid, Row } from 'react-bootstrap'

@inject('appStore')
@observer
export default class Menu extends React.Component {

  render = () => {
    const { message } = this.props.appStore

    return (
      <Row className="container-fluid">
        <Col xs={18} md={12}>
          {message && <Alert bsStyle={message.type}>{message.text}</Alert>}
        </Col>
      </Row>
    )
  }

}
