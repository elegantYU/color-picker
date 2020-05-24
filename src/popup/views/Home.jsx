import React, { PureComponent } from "react";

export default class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hexColor: "",
      rgbColor: "",
    };
  }

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

  getColor() {
    chrome.runtime.sendMessage(
      {
        command: "lastColor",
      },
      (color) => {
        const hex = this.convertRgbToHex(color);
        this.setState({
          hexColor: hex,
          rgbColor: color,
        });
      }
    );
  }

  pickColor = () => {
    chrome.runtime.sendMessage({
      command: "create",
    });
  };

  componentDidMount() {
    this.getColor();
  }

  render() {
    const COPY_TEXT = chrome.i18n.getMessage("__MSG_copy__");

    return (
      <div id="home">
        <button
          className="pickerBtn"
          style={{ backgroundColor: this.state.hexColor }}
          onClick={this.pickColor}
        >
          <i className="pc-iconfont"></i>
        </button>

        <div className="copyGroup">
          <label>
            <input type="text" readOnly value={this.state.hexColor} />
            <span>{COPY_TEXT}</span>
          </label>
          <label>
            <input type="text" readOnly value={this.state.rgbColor} />
            <span>{COPY_TEXT}</span>
          </label>
        </div>
      </div>
    );
  }
}
