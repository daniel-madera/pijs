import React from 'react'
import { observer, inject } from 'mobx-react'

import { FieldGroup, Button, Glyphicon } from 'react-bootstrap'
import Confirm from 'react-confirm-bootstrap'
import { GlyphButton, SimpleSelect, SimpleInput } from '../others/form'

@inject('groupStore')
@observer
export default class EditorRowLogged extends React.Component {

  onClickDelete = e => {
    let { group, groupStore } = this.props
    groupStore.remove(group)
  }

  onClickSignOut = e => {
    let { group, groupStore } = this.props
    groupStore.signOut(group)
  }

  render() {
    const { group } = this.props

    return (
      <tr>
        <td>{group.id}</td>
        <td>{group.title}</td>
        <td>{group.name}</td>
        <td>{`${group.owner.first_name} ${group.owner.last_name}`}</td>
        <td>{group.users_count}</td>
        <td>{group.tests_count}</td>
        <td className="text-right">
          <Confirm
            onConfirm={this.onClickSignOut}
            body="Opravdu se chcete odhlásit z třídy?"
            confirmText="Potvrdit odhlášení"
            title="Odhlášení ze třídy">
            <Button className='icon'>
              <Glyphicon glyph="log-out" />
            </Button>
          </Confirm>
        </td>
      </tr>
    )
  }
}
