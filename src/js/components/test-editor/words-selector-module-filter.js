import React from 'react'
import { inject, observer } from 'mobx-react'

import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

@inject('testEditorStore')
@observer
export default class TestEditor extends React.Component {

  selectModule = e => {
    let moduleId = parseInt(e.target.value)
    let module = this.props.testEditorStore.modules.find(m => m.id === moduleId)
    this.props.testEditorStore.selectModule(module)
  }

  render() {
    const { modules, selectedModule } = this.props.testEditorStore

    return (
      <FormGroup controlId="formControlsSelect" className="select-module">
        <ControlLabel>Vyberte modul</ControlLabel>
        <FormControl componentClass="select" defaultValue={selectedModule} onChange={this.selectModule}>
          {modules.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
        </FormControl>
      </FormGroup>
    )
  }
}
