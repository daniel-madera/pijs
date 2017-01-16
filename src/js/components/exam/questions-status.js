import React from 'react'
import { Table } from 'react-bootstrap'

import QuestionsStatusRow from './questions-status-row'

export default class QuestionsStatus extends React.Component {
  render() {
    const { questions } = this.props
    return (
      <Table responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Otázka</th>
            <th>Odpověď</th>
            <th>Obtížnost</th>
            <th>Odpovědi</th>
            <th>Nutných opakování</th>
            <th>Leitner kategorie</th>
            <th>Flag</th>
          </tr>
        </thead>
        <tbody>
          {questions.map(q => {
            return <QuestionsStatusRow isCurrent={q === this.props.question} key={q.id} question={q} />})}
        </tbody>
      </Table>
    );
  }
}
