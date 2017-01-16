import React from 'react'
import { observer, inject } from 'mobx-react'

import { Form, Grid, Row, Col, Button } from 'react-bootstrap'
import { SimpleList } from '../components/others/lists'
import { SimpleInput } from '../components/others/form'
import EditorRow from '../components/textbook-editor/editor-row'
import EditorRowNew from '../components/textbook-editor/editor-row-new'
import ImportModal from '../components/textbook-editor/import-modal'

@inject('appStore', 'textbookEditorStore', 'routerStore')
@observer
export default class TextbookEditor extends React.Component {

  componentWillMount() {
    this.props.textbookEditorStore.textbookId = this.props.params.textbookId
  }

  componentDidMount() {
    this.props.textbookEditorStore.fetchModules()
    this.props.appStore.fetchDifficulties()
    this.props.appStore.fetchWordClasses()
  }

  addModule = e => {
    let data = {
      title: this.moduleTitle.value
    }

    this.moduleTitle.value = ''
    this.props.textbookEditorStore.addModule(data)
  }

  moduleKeypress = e => {
    if (e.key === 'Enter') {
      this.addModule(e)
    }
  }

  openImportModal = e => {
    this.props.textbookEditorStore.showImportModal = true
  }

  closeImportModal = e => {
    this.props.textbookEditorStore.showImportModal = false
  }

  render() {
    const { words, selectedModule, modules, showImportModal } = this.props.textbookEditorStore

    let onClicks = []
    modules.forEach(m => {
      onClicks.push(e => {
        this.props.textbookEditorStore.selectModule(m)
      })
    })

    return (
      <Grid fluid>
        <Row>
          <ImportModal show={this.props.textbookEditorStore.showImportModal} close={this.closeImportModal} />
          <Col xs={4} md={2}>
            <SimpleList list={modules} selected={selectedModule} onClicks={onClicks}/>
            <SimpleInput
              className="full-width"
              inputRef={ref => this.moduleTitle = ref}
              placeholder="Název nového modulu"
              type="text"
              onKeyPress={this.moduleKeypress}
            />
            <Button className="full-width" bsStyle="success" onClick={this.openImportModal}>Import slov</Button>
          </Col>
          <Col xs={14} md={10}>
            {selectedModule ? <Form className="tiny" inline>
              {words.map(w => 
                <EditorRow key={w.id} word={w} />
              )}
              <EditorRowNew />
            </Form> : <p>Začněte vytvořením nového modulu. Zadejte jeho název a zvolte ENTER. Modul slouží k rozdělení slov do lekcí.</p>}
          </Col>
        </Row>
      </Grid>
    );
  }
}
