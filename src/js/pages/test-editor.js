import React from 'react'
import { inject, observer } from 'mobx-react'

import { Grid, Row, Col } from 'react-bootstrap'

import { ListGroup, ListGroupItem, Form, FormGroup, FormControl, Glyphicon, Well, ControlLabel, Checkbox, Button } from 'react-bootstrap'
import { SimpleInput, GlyphButton } from '../components/others/form'

import TestList from '../components/test-editor/test-list'
import TestWordsList from '../components/test-editor/test-words-list'
import WordsSelector from '../components/test-editor/words-selector'

@inject('testEditorStore')
@observer
export default class TestEditor extends React.Component {

  componentDidMount() {
    let testId = parseInt(this.props.params.testId)

    let success = () => {
      let test = this.props.testEditorStore.tests.find(t => t.id === testId)
      this.props.testEditorStore.selectTest(test)
    }

    this.props.testEditorStore.fetchTests(success)
  }

  render() {
    const { selectedTest } = this.props.testEditorStore

    return (
      <Grid className="test-editor" fluid>
        {selectedTest ?
          <Row>
            <Col xs={5} md={3}>
               <TestList />
            </Col>
            <Col xs={5} md={3}>
              <TestWordsList />
            </Col>
            <Col xs={8} md={6}>
              <WordsSelector />
            </Col>
          </Row>
          : <p>Nemáte vybrán žádný test.</p>
        }
      </Grid>
    )
  }
}
