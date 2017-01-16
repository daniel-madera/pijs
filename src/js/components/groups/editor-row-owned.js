import React from 'react'
import { observer, inject } from 'mobx-react'

import { FieldGroup, Button, Glyphicon } from 'react-bootstrap'
import Confirm from 'react-confirm-bootstrap'
import { GlyphButton, SimpleSelect, SimpleInput } from '../others/form'

@inject('groupStore')
@observer
export default class EditorRowOwned extends React.Component {

  onClickDelete = e => {
    let { group, groupStore } = this.props
    groupStore.remove(group)
  }

  updateTitle = e => {
    let { group, groupStore } = this.props
    group.title = e.target.value
    groupStore.patch(group, { title: group.title })
  }

  updatePassword = e => {
    let { group, groupStore } = this.props
    group.password = e.target.value
    groupStore.patch(group, { password: group.password })
  }

  render() {
    const { group } = this.props

    return (
      <tr>
        <td>{group.id}</td>
        <td>
          <SimpleInput
            className="full-width"
            name={'title-' + group.id}
            placeholder={"Název třídy"}
            defaultValue={group.title}
            type="text"
            onBlur={this.updateTitle}
          />
        </td>
        <td>
          {group.name}
        </td>
        <td>
          <SimpleInput
            className="full-width"
            name={'title-' + group.id}
            placeholder={"Heslo pro vstup"}
            defaultValue={group.password}
            type="text"
            onBlur={this.updatePassword}
          />
        </td>
        <td>
          {group.users_count}
        </td>
        <td>
          {group.tests_count}
        </td>
        <td className="text-right">
          <Confirm
            onConfirm={this.onClickDelete}
            body="Opravdu chcete smazat třídu? 
              Uživatelé se nebudou moci k této třídě už přihlásit."
            confirmText="Potvrdit odstranění"
            title="Odstranění třídy">
            <Button className='icon'>
              <Glyphicon glyph="trash" />
            </Button>
          </Confirm>
        </td>
      </tr>
    )
  }
}
