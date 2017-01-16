import React from 'react'
import { observer, inject } from 'mobx-react'

import { Modal, FormControl, FormGroup, Button, Form, ListGroup, ListGroupItem } from 'react-bootstrap'

import { SimpleInput } from '../others/form'
import { SimpleList } from '../others/lists'

@inject('testStore', 'groupStore')
@observer
export default class EditorRowTextbookModal extends React.Component {

  selectGroup(groupId, e) {
    this.props.testStore.toggleSelectedGroups(groupId)
  }

  render() {
    const { selectedGroups } = this.props.testStore
    const { ownedGroups } = this.props.groupStore

    return (
      <Modal show={this.props.show} onHide={this.props.close}>
        <Form className="tiny" inline>
        <Modal.Header closeButton>
          <h4>Výběr skupin do kterých test patří</h4>
        </Modal.Header>
        <Modal.Body>
          <h4>Moje skupiny</h4>
          <ListGroup>
            {ownedGroups.map(g => 
              <ListGroupItem key={g.id} onClick={this.selectGroup.bind(this, g.id)} active={selectedGroups.includes(g.id)}>
              {g.title}
              </ListGroupItem>
            )}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="info" onClick={this.props.close}>Vybrat</Button>
        </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}
