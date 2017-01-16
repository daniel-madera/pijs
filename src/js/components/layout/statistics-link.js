import React from 'react'
import { observer, inject } from 'mobx-react'

import StatisticsModal from './statistics-modal'

@inject('userStore')
@observer
export default class StatisticsLink extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      show: false
    }
  }

  open = e => {
    this.props.userStore.fetchStatistics()
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
    return (
      <span>
        <a onClick={this.open}>Jak jsem na tom?</a>
        <StatisticsModal show={this.state.show} close={this.close} open={this.open} />
      </span>
    )
  }
}
