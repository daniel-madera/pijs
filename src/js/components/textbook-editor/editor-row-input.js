import React from 'react'
import { observer, inject } from 'mobx-react'

import { FormGroup, FormControl } from 'react-bootstrap'

@inject('textbookEditorStore')
@observer
export default class EditorRowInput extends React.Component {

  changeValue = e => {
    const { word } = this.props
    const { name, value } = e.target

    let data = {}
    data[name] = value
    this.props.textbookEditorStore.patch(word, data)
    word[name] = value
  }

  render() {
    const { className, name, options, placeholder, type, word, inputRef, onBlur } = this.props
    const value = word && word[name]

    switch (type) {
      case 'input':
      case 'password':
        return <FormGroup className={className || name}>
          <FormControl defaultValue={value} type={type} name={name} 
              onBlur={word ? this.changeValue : onBlur} placeholder={placeholder} inputRef={inputRef} />
        </FormGroup>

      case 'select':
        return <FormGroup className={className || name}>
          <FormControl componentClass='select' defaultValue={value} name={name} 
              onChange={word && this.changeValue} placeholder={placeholder} inputRef={inputRef}>
            {options.map(o => <option key={o.id} value={o.id}>{o.title}</option>)}
          </FormControl>
        </FormGroup>

      default:
        return <div/>
    }



  }
}
