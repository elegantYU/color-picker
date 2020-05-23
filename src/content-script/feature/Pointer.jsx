import React, { Component } from "react";
import Panel from "./Panel.jsx";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      top: null,
      left: null,
      centerColor: "rgb(255,255,255)",
      centerColorHex: "#FFFFFF",
      colorGroups: [],
    };
    this.offset = 85;
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
        const midIdx = Math.floor(colorGroups.length / 2);

        this.setState({
          colorGroups,
          centerColor: colorGroups[midIdx],
          centerColorHex: this.convertRgbToHex(colorGroups[midIdx]),
        });
      }
    );
  };

  clickHandler = () => {
    // 先复制再关闭
    const tempInput = document.createElement("input");
    document.body.appendChild(tempInput);
    tempInput.value = this.state.centerColorHex;
    tempInput.select();
    if (document.execCommand("copy")) {
      document.execCommand("copy");
    }
    document.body.removeChild(tempInput);

    chrome.runtime.sendMessage({
      command: "destory",
      data: {
        color: this.state.centerColor,
      },
    });
  };

  convertRgbToHex = (rgb) => {
    const reg = /\(.*\)/g;
    const colors = reg.exec(rgb)[0].replace(/\(|\)/g, "").split(",");

    return colors
      .reduce((last, curr) => {
        const string16 = Number(curr).toString(16);
        const hex = string16.length === 1 ? `0${string16}` : string16;
        return last + hex;
      }, "#")
      .toUpperCase();
  };

  render() {
    const { ...props } = this.props;
    const { isStart } = props

    return (
      <div
        id="ColorPickerPointer"
        onMouseMove={(e) => this.mousemoveHandler(e)}
      >
        {isStart && (
          <div
            className="pointer"
            style={{
              borderColor: this.state.centerColor,
              top: `${this.state.top}px`,
              left: `${this.state.left}px`,
            }}
            onClick={(e) => this.clickHandler(e)}
          >
            {this.state.colorGroups.map((item, i) => (
              <div
                className="pointer-grid-item"
                key={i}
                style={{ backgroundColor: item || "rgb(255,255,255)" }}
              ></div>
            ))}

            <div className="centerBlock"></div>
            <div className="floatTip">{this.state.centerColorHex}</div>
          </div>
        )}
        {isStart && (
          <Panel
            currentColor={this.state.centerColor}
            currentColorHex={this.state.centerColorHex}
          />
        )}
      </div>
    );
  }
}
