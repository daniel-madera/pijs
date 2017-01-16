import React from 'react'
import { observer, inject } from 'mobx-react'

import { Alert, Form, FormGroup, FormControl, ControlLabel, Button, Row, Col, Grid, InputGroup, Glyphicon } from 'react-bootstrap'
import { GlyphButton } from '../others/form'

@inject('appStore', 'examStore')
@observer
export default class Questioner extends React.Component {

  showHint = e => {
    const { examStore } = this.props
    if (examStore.hintLevel === 3)
      return false

    examStore.hintLevel += 1
  }

  render() {

    const { definition, usage } = this.props
    const { hintLevel } = this.props.examStore

    return (
      <div>
        <Button className="show-hint" onClick={this.showHint} disabled={hintLevel === 2}>{hintLevel > 0 ? 'Zobrazit další nápovědu' : 'Zobrazit nápovědu'}</Button>
        <div className="hints">
          {definition && <Alert bsStyle="info">Definice: {definition}</Alert>}
          {hintLevel >= 1 && <Alert bsStyle="info">První písmeno odpovědi: {this.props.value.substring(0, 1)}</Alert>}
          {hintLevel >= 2 && usage && <Alert bsStyle="info">Použití ve větě: {usage}</Alert>}
        </div>
      </div>
    )
  }
}
