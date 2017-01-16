import React from 'react'
import LoadingIndicator from 'react-loading-indicator'
import DevTools from 'mobx-react-devtools'
import { observer, inject } from 'mobx-react'

import { Row } from 'react-bootstrap'
import Footer from '../components/layout/footer'
import Menu from '../components/layout/menu'
import Message from '../components/layout/message'

@inject('appStore')
@observer
export default class Layout extends React.Component {

  render() {
    const { appStore } = this.props

    return (
      <div>
        {appStore.indicator && <div className="loading-indicator"><LoadingIndicator segmentLength="0.8" /></div>}
        <div className="wrapper">
          <Menu />
          <Message />
          <Row className="container-fluid">
            {this.props.children}
          </Row>
        </div>
        {/*<Footer/>*/}
        {/*<DevTools /> */}
      </div>
    );
  };
}
