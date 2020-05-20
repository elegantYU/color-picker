import React, { Component } from 'react'

export default class Panel extends Component {

  render() {
    return (
      <div id="ColorPickerPanel">
        <span className="color-block" style={{ backgroundColor: '#c75f5f' }}></span>
        <div className="color-words">
          <p>#c75f5f</p>
          <p>rgb(255, 255, 255)</p>
        </div>
      </div>
    )
  }
}