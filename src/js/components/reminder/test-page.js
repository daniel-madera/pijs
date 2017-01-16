import React from 'react'
import { observer, inject } from 'mobx-react'

import { Col, Grid, Row, Button, Table, Form } from 'react-bootstrap'
import { SimpleInput, GlyphButton } from '../others/form'

import TestItem from './test-item'

@inject('reminderStore')
@observer
export default class TestPage extends React.Component {

  render = () => {
    const { words, selectedWord } = this.props.reminderStore
    return (
      <Grid fluid>
        <Row>
          <Col xs={14} md={9}>
            <Form className="tiny" inline>
            <Table>
              <tbody>
                <tr><th>Slovo</th><th>Jazyk</th><th>Překlad</th><th>Vyhodnotit</th><th>Datum příštího připomenutí</th></tr>
                {words.map((word, i) => <TestItem key={i} word={word} />)}
              </tbody>
            </Table>
            </Form>
          </Col>
          <Col xs={4} md={3}>
          </Col>
        </Row>
      </Grid>
    )
  }
}
