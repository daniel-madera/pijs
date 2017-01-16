import React from 'react'
import { observer } from 'mobx-react'

import { ListGroup, ListGroupItem } from 'react-bootstrap'

@observer
export class SimpleList extends React.Component {

  render = () => {
    let { list, onClicks, selected } = this.props

    if (!Array.isArray(onClicks) || list.length != onClicks.length) {
      onClicks = Array(list.length)
      onClicks.fill(function() {})
    }

    var mappedItems = list.map((t, i) =>
      <ListGroupItem key={t.id} onClick={onClicks[i]} active={selected === t || selected === t.id}>
        {t.title}
      </ListGroupItem>
    )

    return (
      <ListGroup>
        {mappedItems}
      </ListGroup>
    )
  }
}
