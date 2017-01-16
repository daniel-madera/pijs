import React from 'react'
import { inject, observer } from 'mobx-react'

import WordsSelectorModuleFilter from './words-selector-module-filter'
import WordsSelectorList from './words-selector-list'

@inject('testEditorStore')
@observer
export default class TestEditor extends React.Component {

  render() {
    const { selectedTest } = this.props.testEditorStore
    const { modules, selectedModule } = this.props.testEditorStore

    const textbookTitle = (
      <h4>
        {selectedTest.textbook.title} 
        ({selectedTest.textbook.language}) 
        <span className="pull-right">{selectedTest.textbook.owner}</span>
      </h4>
    )

    return (
      <div>
        {textbookTitle}
        {modules.length > 0 ?
          <div>
            <WordsSelectorModuleFilter />
            <WordsSelectorList />
          </div>
          : <p>Učebnice nemá žádné lekce/moduly se slovy.</p>
        }
      </div>
    )
  }
}
