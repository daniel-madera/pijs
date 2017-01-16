import React from 'react'
import { observer, inject } from 'mobx-react'

import { Table } from 'react-bootstrap'

@inject('examStore')
@observer
export default class Summary extends React.Component {
  render() {
    const { words, done, testPhase } = this.props.examStore

    return (
      <div>
        <h4>Shrnutí</h4>
        <Table responsive>
          <tbody>
            <tr>
              <td>Počet otázek</td>
              <td>{words.length}</td>
            </tr>
            <tr>
              <td>Dokončeno</td>
              <td>{done.length}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}
