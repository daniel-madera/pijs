import React from 'react'
import { observer, inject } from 'mobx-react'

import { Modal, FormControl, FormGroup, Button, Form, ListGroup, ListGroupItem } from 'react-bootstrap'

import { SimpleInput } from '../others/form'
import { SimpleList } from '../others/lists'

@inject('testStore', 'textbookPublicStore', 'textbookStore')
@observer
export default class EditorRowTextbookModal extends React.Component {

  componentDidMount() {
    this.props.textbookStore.fetch()
    this.props.textbookPublicStore.fetch()
    this.props.textbookPublicStore.filterValue = undefined
  }

  filterChanged = e => {
    this.props.textbookPublicStore.filterValue = e.target.value
  }

  selectTextbook(textbook, e) {
    this.props.textbookPublicStore.selectedTextbook = textbook.id
    this.props.textbookPublicStore.selectedTextbookTitle = textbook.title
  }

  render() {
    const { filteredTextbooks, selectedTextbook } = this.props.textbookPublicStore
    const { textbooks } = this.props.textbookStore

    return (
      <Modal show={this.props.show} onHide={this.props.close} className='modal-large'>
        <Form className="tiny" inline>
        <Modal.Header closeButton>
          <h4>Výběr učebnice</h4>
        </Modal.Header>
        <Modal.Body>
          <div className="column-split">
            <h4>Moje učebnice</h4>
            <SimpleInput 
              className="full-width filter-input"
              placeholder="Hledejte dle názvu"
              type="text"
              disabled="true"
            />
            <ListGroup>
              {textbooks.map(t => 
                <ListGroupItem key={t.id} onClick={this.selectTextbook.bind(this, t)} active={selectedTextbook === t.id}>
                {t.title}
                </ListGroupItem>
              )}
            </ListGroup>
          </div>
          <div className="column-split">
            <h4>Všechny učebnice</h4>
            <SimpleInput 
              className="full-width filter-input"
              placeholder="Hledejte dle názvu, vlastníka nebo jazyku"
              type="text"
              onChange={this.filterChanged}
            />
            <ListGroup>
              {filteredTextbooks.map(t => 
                <ListGroupItem key={t.id} onClick={this.selectTextbook.bind(this, t)} active={selectedTextbook === t.id}>
                {`${t.title} (${t.language})`}<span className="pull-right">{t.owner}</span>
                </ListGroupItem>
              )}
            </ListGroup>
          </div>
          <div className="clearfix"></div>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="info" onClick={this.props.close}>Vybrat</Button>
        </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}
