import React from 'react'
import { observer, inject } from 'mobx-react'

import { Col, Grid, Row, Button } from 'react-bootstrap'
import { SimpleList } from '../others/lists'

import Questioner from './questioner'
import Summary from './summary'
import QuestionsStatus from '../exam/questions-status'


@inject('examStore')
@observer
export default class WordsSelector extends React.Component {

  render = () => {
    const { words, selectedWord } = this.props.examStore

    return (
      <Grid fluid>
        <Row>
          <Col xs={14} md={9}>
            <Questioner />
          </Col>
          <Col xs={4} md={3}>
            <Summary />
          </Col>
        </Row>
        <Row className="hidden" style={{marginTop: '30px'}}>
          <Col xs={18} md={12}><QuestionsStatus questions={words} question={selectedWord} /></Col>
        </Row>
      </Grid>
    )
  }
}
