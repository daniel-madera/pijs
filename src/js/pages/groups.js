import React from 'react'
import { observer, inject } from 'mobx-react'

import { Grid, Row, Col, Form, Table } from 'react-bootstrap'
import EditorRowOwned from '../components/groups/editor-row-owned'
import EditorRowOwnedNew from '../components/groups/editor-row-owned-new'
import EditorRowLogged from '../components/groups/editor-row-logged'
import EditorRowLoggedNew from '../components/groups/editor-row-logged-new'

@inject('groupStore')
@observer
export default class Textbooks extends React.Component {

  componentDidMount = () => {
    this.props.groupStore.fetchOwned()
    this.props.groupStore.fetchLogged()
  }

  render() {
    const { ownedGroups, loggedGroups } = this.props.groupStore

    return (
      <Grid fluid>
        <Row>
          <Col xs={18} md={12}>
            <h4>Moje třídy</h4>
            <Form className="tiny" inline>
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>#</th><th>Název třídy</th><th>Jméno pro vstup</th><th>Heslo pro vstup</th><th>Počet přihlášených uživatelů</th><th>Počet testů</th><th></th>
                  </tr>
                </thead>
                <tbody>
                  {ownedGroups.map(g => 
                    <EditorRowOwned key={g.id} group={g} />
                  )}
                  <EditorRowOwnedNew />
                </tbody>
              </Table>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col xs={18} md={12}>
            <h4>Přihlášené třídy</h4>
            <Form className="tiny" inline>
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>#</th><th>Název třídy</th><th>Jméno</th><th>Vlastník</th><th>Počet přihlášených uživatelů</th><th>Počet testů</th><th></th>
                  </tr>
                </thead>
                <tbody>
                  {loggedGroups.map(g => 
                    <EditorRowLogged key={g.id} group={g} />
                  )}
                  <EditorRowLoggedNew />
                </tbody>
              </Table>
            </Form>
          </Col>
        </Row>
      </Grid>
    )
  }
}
