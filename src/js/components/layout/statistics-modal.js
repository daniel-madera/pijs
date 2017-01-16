import React from 'react'
import { observer, inject } from 'mobx-react'

import { Modal, Table, Button } from 'react-bootstrap'

@inject('userStore')
@observer
export default class StatisticsModal extends React.Component {

  render() {
    const { statistics } = this.props.userStore

    return (
      <Modal show={this.props.show} onHide={this.props.close} className='modal-large'>
        <Modal.Header closeButton>
          <h4>Moje úspěchy</h4>
        </Modal.Header>
        <Modal.Body>
          {statistics && 
              <div>
                <Table responsive>
                  <tbody>
                  <tr>
                    <th>Počet mých zvládnutých slov</th><td>{statistics.user.mastered_words}</td>
                  </tr>
                  <tr>
                    <th>Počet unikátních mých zvládnutých slov</th><td>{statistics.user.mastered_unique_words}</td>
                  </tr>
                  {statistics.groups.map(g => 
                    <tr key={g.id}>
                      <th>Počet zvládnutých slov ve třídě {g.title}, zakladatel: {g.owner}</th><td>{g.mastered_words}</td>
                    </tr>
                  )}
                  </tbody>
                </Table>
              </div>
            }
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="info" onClick={this.props.close}>Zavřít</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
