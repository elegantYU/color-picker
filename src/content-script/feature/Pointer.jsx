import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      top: null,
      left: null,
    }
    this.offset = 80
  }

  mousemoveHandler = e => {
    // if (this.top && this.left) {
    //   const dx = e.clientX - this.top
    //   const dy = e.clientY - this.left
    //   this.setState({
    //     translateX: this.state.translateX + dx,
    //     translateY: this.state.translateY + dy
    //   })
    // }

    this.setState({
      top: e.clientY - this.offset,
      left: e.clientX - this.offset,
    })
  }

  render() {
    let colorGroups = []
    for (let i = 0; i < 225; i++) {
      colorGroups.push('#fff')
    }

    return (
      <div id="ColorPickerPointer" onMouseMove={ e => this.mousemoveHandler(e) }>
        <div 
          className="pointer"
          style={{ borderColor: '#eee', top: `${this.state.top}px`, left: `${this.state.left}px` }}
        >
          {
            colorGroups.map((item, i) => (
              <div 
                className="pointer-grid-item"
                key={i}
                style={{ backgroundColor: item || '#fff' }}
              >
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}