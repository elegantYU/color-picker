import React, { Component } from 'react'

export default class Panel extends Component {
  render() {
    const { ...props } = this.props
    const {currentColor, currentColorHex}  = props

    return (
      <div id="ColorPickerPanel">
        <span className="color-block" style={{ backgroundColor: currentColor }}></span>
        <div className="color-words">
          <p>{ currentColorHex }</p>
          <p>{ currentColor }</p>
        </div>
      </div>
    )
  }
}