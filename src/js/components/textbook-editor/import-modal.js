import React from 'react'
import { observer, inject } from 'mobx-react'

import { Button, Modal, Form, FormControl, FormGroup } from 'react-bootstrap'

@inject('textbookEditorStore', 'importStore', 'appStore')
@observer
export default class ImportModal extends React.Component {

  import = e => {
    let { textbookEditorStore, importStore, appStore } = this.props
    let file = this.inputFile.files[0]
    appStore.showIndicator()
    importStore.textbookId = this.props.textbookEditorStore.textbookId
    importStore.importCSV(file, () => {
      this.props.close()
      textbookEditorStore.fetchModules()
      appStore.hideIndicator()
    })
  }

  render() {
    const {} = this.props.textbookEditorStore

    return (
      <Modal show={this.props.show} onHide={this.props.close} className='modal-large'>
        <Form className="tiny" inline>
        <Modal.Header closeButton>
          <h4>Import slovíček</h4>
        </Modal.Header>
        <Modal.Body>
          <h6>Formát souboru:</h6>
            <ul className="clean-list">
              <li>value,meaning,definition,usage,word_class</li>
              <li>"family","rodina","Group of related people.",,1</li>
              <li>"run","běhat","Moving faster than walk.","Lucie and Jana run to school.",5</li>
              <li>"freak","zrůda",,,1</li>
              <li>"Modul 2",,,,</li>
              <li>"lift","vlek",,,1</li>
            </ul>
          <FormGroup>
            <FormControl type="file" name="import-file" inputRef={ref => this.inputFile = ref} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="info" onClick={this.import}>Importovat</Button>
        </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}
