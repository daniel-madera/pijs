import React from 'react'
import { inject, observer } from 'mobx-react'
import { Grid, Row, Col } from 'react-bootstrap'

import TestPage from '../components/reminder/test-page'

@inject('reminderStore')
@observer
export default class Reminder extends React.Component {

  componentDidMount = () => {
    this.props.reminderStore.fetchWords()
  }

  render() {
    const { words } = this.props.reminderStore
    let page

    if (words && words.length !== 0) {
      page = <TestPage />
    } else {
      page = (
        <Grid fluid>
          <Row>
            <Col xs={14} md={9}>
              <p>Nemáte žádná slova k připomenutí.</p>
            </Col>
          </Row>
        </Grid>
      )
    }

    return page
  }
}
