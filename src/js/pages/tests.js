import React from 'react'
import { observer, inject } from 'mobx-react'

import { Grid, Row, Col, Form, Table } from 'react-bootstrap'
import EditorRow from '../components/tests/editor-row'
import EditorRowNew from '../components/tests/editor-row-new'

@inject('testStore', 'groupStore')
@observer
export default class Textbooks extends React.Component {

  componentDidMount = () => {
    this.props.testStore.fetch()
    this.props.groupStore.fetchOwned()
  }

  render() {
    const tests = this.props.testStore.tests

    return (
      <Grid fluid>
        <Row>
          <Col xs={18} md={12}>
            <Form className="tiny" inline>
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>#</th><th>Název testu</th><th>Přiřazená učebnice</th><th>Počet tříd</th><th>Počet slov</th><th></th>
                  </tr>
                </thead>
                <tbody>
                  {tests.map(t => 
                    <EditorRow key={t.id} test={t} />
                  )}
                  <EditorRowNew />
                </tbody>
              </Table>
            </Form>
          </Col>
        </Row>
      </Grid>
    )
  }
}
