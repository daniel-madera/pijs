import React from 'react'
import { observer, inject } from 'mobx-react'

@inject('textbookEditorStore')
@observer
export default class EditorRowPictureModalImage extends React.Component {

  render() {
    const { image, onClick } = this.props
    const width = image.thumbnailWidth
    const height = image.thumbnailHeight
    const src = image.thumbnailLink

    return <img onClick={onClick} className="pointer pull-left modal-image" src={src} width={width} height={height} alt="Autopick"/>
  }
}
