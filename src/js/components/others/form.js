import React from 'react'
import { observer } from 'mobx-react'
import { Button, Glyphicon, FormGroup, FormControl } from 'react-bootstrap'

@observer
export class GlyphButton extends React.Component {
  render() {
    const { glyph, title, tooltip } = this.props
    const attributes = Object.assign({}, this.props)
    attributes.className = attributes.className || ''
    delete attributes.glyph
    delete attributes.title
    delete attributes.tooltip

    if (!title) {
      attributes.className = attributes.className.concat(' tooltip-control icon')
    }

    return (
      <Button {...attributes}>
        <Glyphicon glyph={"glyphicon glyphicon-" + glyph} />
        {title ? " " + title : ""}
        {tooltip && <span className="tooltip-text">{tooltip}</span>}
      </Button>
    )
  }
}

@observer
export class SimpleSelect extends React.Component {
  render() {
    const { className, name, onChange, options, placeholder, inputRef, value } = this.props

    return (
      <FormGroup className={className}>
        <FormControl inputRef={inputRef} componentClass='select' defaultValue={value} name={name} 
            onChange={onChange} placeholder={placeholder}>
          {options.map((o, i) => <option key={i} value={o.id}>{o.title}</option>)}
        </FormControl>
      </FormGroup>
    )
  }
}

@observer
export class SimpleInput extends React.Component {

  render() {
    var props = Object.assign({}, this.props)
    const className = props.className
    delete props.className

    return (
      <FormGroup className={className}>
        <FormControl {...props} />
      </FormGroup>
    )
  }
}
