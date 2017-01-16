import React from 'react'
import { observer, inject } from 'mobx-react'
import $ from 'jquery'

import { FormGroup } from 'react-bootstrap'
import { GlyphButton } from '../others/form'
import axios from 'axios'

import EditorRowPictureModal from './editor-row-picture-modal'

@inject('appStore')
@observer
export default class EditorRowPicture extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      show: false,
      images: []
    }
  }

  onClick = e => {
    this.open()
  }

  open = e => {
    this.setState({
      show: true
    })

    const { value } = this.props.word
    this.props.appStore.showIndicator()

    let component = this
    $.getJSON({
      url: `https://www.googleapis.com/customsearch/v1?q=${encodeURI(value)}&searchType=image&cx=009761758207189136187:k8u_qnxvkds&key=AIzaSyDRfgYaPD-qucjrxJ2Of8n27YifN5_FXsY`,
      success: (data, textStatus) => {
        component.setState({
          images: data.items
        })
      }
    }).always(function() {
      component.props.appStore.hideIndicator()
    })
  }

  close = e => {
    this.setState({
      show: false
    })
  }


  render() {
    const { word } = this.props
    const { apiURL, assetExists } = this.props.appStore
    const url = apiURL + word.picture

    let display = <img className="pointer" onClick={this.onClick} 
      src={url} alt="Popis" />

    if (!word.picture)
      display = <GlyphButton glyph='plus' onClick={this.onClick} tooltip="Získat obrázek" />


    return <FormGroup className="picture">
      <EditorRowPictureModal word={word} images={this.state.images} show={this.state.show} 
        close={this.close} open={this.open} />
        {display}
    </FormGroup>
  }
}
