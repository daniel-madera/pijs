import React from 'react'
import { observer, inject } from 'mobx-react'

import { Modal, FormControl, FormGroup, Button, Form } from 'react-bootstrap'

@inject('textbookEditorStore', 'appStore')
@observer
export default class EditorRowPictureModal extends React.Component {
  onClickImg(image, e) {
    const picture_link = image.link
    const thumbnail_link = image.image.thumbnailLink
    this.props.appStore.showIndicator()
    const success = () => { this.props.appStore.hideIndicator() }
    const failure = () => {
      alert('Tento obrázek je bohužel nedostupný z licenčních důvodů. Prosím vyberte jiný.')
      this.props.appStore.hideIndicator()
    }
    this.props.textbookEditorStore.savePicture(this.props.word, picture_link, success, failure)
    this.props.close()
  }

  onClickNoImg = e => {
    this.props.textbookEditorStore.removePicture(this.props.word)
    this.props.close()
  }


  render() {
    const { word } = this.props

    return (
      <Modal show={this.props.show} onHide={this.props.close}>
        <Form className="tiny" inline>
        <Modal.Header closeButton>
          Obrazový význam slova - "{word.value}/{word.meaning}"
        </Modal.Header>
        <Modal.Body style={{overflowY: 'scroll'}}>
          {this.props.images.map((i, j) => {
            return <img key={j} onClick={this.onClickImg.bind(this, i)} className="pointer pull-left modal-image" src={i.image.thumbnailLink} alt="Autopick"/>
          }
          )}
        </Modal.Body>
        <Modal.Footer>
          <div>
            <Button onClick={this.onClickNoImg} bsStyle="default">Žádný obrázek</Button>
          </div>
        </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}
