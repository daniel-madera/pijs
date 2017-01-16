import React from 'react'
import { observer, inject } from 'mobx-react'

import { Grid, Row, Col, Form, Table } from 'react-bootstrap'
import EditorRow from '../components/textbooks/editor-row'
import EditorRowNew from '../components/textbooks/editor-row-new'

@inject('appStore', 'textbookStore')
@observer
export default class Textbooks extends React.Component {

  componentDidMount = () => {
    this.props.textbookStore.fetch()
    this.props.appStore.fetchLanguages()
  }

  render() {
    const textbooks = this.props.textbookStore.textbooks

    return (
      <Grid fluid>
        <Row>
          <Col xs={18} md={12}>
            <Form className="tiny" inline>
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>#</th><th>Název učebnice</th><th>Jazyk</th><th></th>
                  </tr>
                </thead>
                <tbody>
                  {textbooks.map(t => 
                    <EditorRow key={t.id} textbook={t} />
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
