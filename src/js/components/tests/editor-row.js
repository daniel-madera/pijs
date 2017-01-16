import React from 'react'
import { observer, inject } from 'mobx-react'

import { FieldGroup, Button, Glyphicon } from 'react-bootstrap'
import Confirm from 'react-confirm-bootstrap'
import { GlyphButton, SimpleSelect, SimpleInput } from '../others/form'

import EditorRowGroupModal from './editor-row-group-modal'

@inject('appStore', 'testStore', 'routerStore')
@observer
export default class EditorRow extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      showGroupModal: false
    }
  }

  onClickDelete = e => {
    let { test, testStore } = this.props
    testStore.remove(test)
  }

  onClickEdit = e => {
    const { push } = this.props.routerStore
    push('/tests/' + this.props.test.id)
  }

  updateTitle = e => {
    let { test, testStore } = this.props
    test.title = e.target.value
    testStore.patch(test, { title: test.title })
  }

  updateGroup = e => {
    let { test, testStore } = this.props
    test.group = e.target.value
    testStore.patch(test, { group: test.title })
  }

  openGroupModal = e => {
    this.setState({
      showGroupModal: true
    })

    this.props.testStore.selectedGroups = this.props.test.groups
  }

  closeGroupModal = e => {
    this.setState({
      showGroupModal: false
    })

    let data = {
      groups: this.props.testStore.selectedGroups
    }

    this.props.testStore.patch(this.props.test, data)
  }

  render() {
    const { test } = this.props

    return (
      <tr>
        <td>{test.id}</td>
        <td>
          <SimpleInput
            className="full-width"
            name={'title-' + test.id}
            placeholder={"Název testu"}
            defaultValue={test.title}
            type="text"
            onBlur={this.updateTitle}
          />
        </td>
        <td>
          {test.textbook.title}
        </td>
        <td>
          <EditorRowGroupModal show={this.state.showGroupModal} close={this.closeGroupModal} open={this.openGroupModal} />
          <a style={{marginLeft: '5px'}} onClick={this.openGroupModal}>{test.groups.length}</a>
        </td>
        <td>
          {test.words_count}
        </td>
        <td className="text-right">
          <Button className='icon' onClick={this.onClickEdit}>
            <Glyphicon glyph="pencil" />
          </Button>
          <Button onClick={this.openGroupModal}>
            Zařadit test do třídy
          </Button>
          <Confirm
            onConfirm={this.onClickDelete}
            body="Opravdu chcete smazat test?"
            confirmText="Potvrdit odstranění"
            title="Odstranění testu">
            <Button className='icon'>
              <Glyphicon glyph="trash" />
            </Button>
          </Confirm>
        </td>
      </tr>
    )
  }
}
