import React from 'react'
import { observer, inject } from 'mobx-react'

import { Col, Grid, Row, Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import { SimpleList } from '../others/lists'

import TestSelectorListItem from './test-selector-list-item'

@inject('testSelectorStore', 'examStore')
@observer
export default class TestSelector extends React.Component {

  componentDidMount() {
    this.props.testSelectorStore.fetchTests()
    this.props.testSelectorStore.selectedTest = undefined
  }

  startExam = e => {
    const { testSelectorStore, examStore } = this.props
    examStore.fetchTestWords(testSelectorStore.selectedTest)

  }

  render() {
    const { ownedTests, loggedTests, selectedTest } = this.props.testSelectorStore

    return (
      <Grid fluid>
        <Row>
          <Col xs={18} md={12}>
            <h4>Vyberte test</h4>
          </Col>
        </Row>
        <Row >
          {ownedTests.length > 0 &&
            <Col xs={9} md={6}>
              <h5>Moje testy</h5>
              <ListGroup>
                {ownedTests.map(t => <TestSelectorListItem key={t.id} test={t} />)}
              </ListGroup>
            </Col>
          }
          {loggedTests.length > 0 &&
            <Col xs={9} md={6}>
              <h5>Testy z přihlášených tříd</h5>
              <ListGroup>
                {loggedTests.map(t => <TestSelectorListItem key={t.id} test={t} />)}
              </ListGroup>
            </Col>
          }
        </Row>
        <Row >
          <Col xs={6} md={4} />
          {selectedTest && 
            <Col xs={6} md={4}>
              <Button className='full-width' bsStyle="success" onClick={this.startExam}>Začít s procvičováním</Button>
            </Col>
          }
          <Col xs={6} md={4} />
        </Row>
      </Grid>
    )
  }
}
