import React from 'react'
import { observer, inject } from 'mobx-react'

import { FormGroup } from 'react-bootstrap'
import { GlyphButton } from '../others/form'

import EditorRowTextbookModal from './editor-row-textbook-modal'

@inject('textbookPublicStore')
@observer
export default class EditorRowTextbook extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      show: false
    }
  }

  open = e => {
    this.setState({
      show: true
    })
  }

  close = e => {
    this.setState({
      show: false
    })
  }

  render() {
    const { selectedTextbookTitle } = this.props.textbookPublicStore
    let title = 'Vybrat učebnici'

    if (selectedTextbookTitle) {
      title = selectedTextbookTitle
    }

    return (
      <span>
        <a onClick={this.open}>{title}</a>
        <EditorRowTextbookModal show={this.state.show} close={this.close} open={this.open} />
      </span>
    )
  }
}
