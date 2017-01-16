import React from 'react';
import { inject, observer } from 'mobx-react'

import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react-bootstrap'

import StatisticsLink from './statistics-link'

@inject('appStore', 'routerStore', 'userStore')
@observer
export default class Menu extends React.Component {

  render = () => {
    const { push, location } = this.props.routerStore
    const { user } = this.props.userStore

    let userProfile = <span><a onClick={() => push('/auth')}>Přihlásit se</a> |  <a onClick={() => push('/register')}>Registrovat se</a></span>
    let navbar = <span />

    if (user) {
      userProfile = <span> <StatisticsLink /> | { user.first_name } { user.last_name } | <a onClick={() => push('/auth')}>odhlásit se</a></span>
      navbar = <Nav>
        <NavItem eventKey={1} onClick={e => push('/textbooks')} 
          active={location.pathname.startsWith('/textbooks')}>Učebnice</NavItem>
        <NavItem eventKey={1} onClick={e => push('/groups')} 
          active={location.pathname.startsWith('/groups')}>Třídy</NavItem>
        <NavItem eventKey={1} onClick={e => push('/tests')} 
          active={location.pathname.startsWith('/tests')}>Testy</NavItem>
        <NavItem eventKey={1} onClick={e => push('/exam')} 
          active={location.pathname.startsWith('/exam')}>Testování</NavItem>
          <NavItem eventKey={1} onClick={e => push('/reminder')} 
          active={location.pathname.startsWith('/reminder')}>Připomenutí</NavItem>
      </Nav>
    }

    return (
      <nav className="container-fluid">
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a onClick={() => push('/')}>{this.props.appStore.title}</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            {navbar}
            <Navbar.Text pullRight>
              {userProfile}
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
      </nav>
    )
  }
}
