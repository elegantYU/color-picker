import React, { Component } from "react";
import Panel from "./Panel.jsx";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      top: null,
      left: null,
      centerColor: "#fff",
      colorGroups: [],
    };
    this.offset = 80;
  }

  mousemoveHandler = (e) => {
    // 此时为pointer的client 非鼠标client
    this.setState({
      top: e.clientY - this.offset,
      left: e.clientX - this.offset,
    });
    
    chrome.runtime.sendMessage(
      {
        command: "slideFetch",
        data: {
          centerX: this.state.left,
          centerY: this.state.top,
        },
      },
      (colorGroups) => {
        const midIdx = Math.floor(colorGroups.length / 2) + 1

        this.setState({
          colorGroups,
          centerColor: colorGroups[midIdx],
        });
      }
    );
  };

  render() {
    return (
      <div
        id="ColorPickerPointer"
        onMouseMove={ e => this.mousemoveHandler(e) }
      >
        <div
          className="pointer"
          style={{
            borderColor: this.state.centerColor,
            top: `${this.state.top}px`,
            left: `${this.state.left}px`,
          }}
        >
          {this.state.colorGroups.map((item, i) => (
            <div
              className="pointer-grid-item"
              key={i}
              style={{ backgroundColor: item || "#fff" }}
            ></div>
          ))}
        </div>
        <Panel currentColor={this.state.centerColor} />
      </div>
    );
  }
}
