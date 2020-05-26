import React, { PureComponent } from "react";
import { convertRgbToHex, convertRgbToHsl } from "../utils";

export default class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hexColor: "",
      rgbColor: "",
      hslColor: "",
      couldPick: true,
    };
    this.checkTabAvailability();
  }

  getColor() {
    chrome.runtime.sendMessage(
      {
        command: "lastColor",
      },
      (color) => {
        const hex = convertRgbToHex(color);
        const hsl = convertRgbToHsl(color);

        this.setState({
          hexColor: hex,
          rgbColor: color,
          hslColor: hsl,
        });
      }
    );
  }

  pickColor = () => {
    setTimeout(() => {
      chrome.runtime.sendMessage({
        command: "create",
      });
    });
    window.close();
  };

  checkTabAvailability = () => {
    chrome.runtime.sendMessage(
      {
        command: "activeTab",
      },
      (_) => {
        console.log('reg.test(tabs[0].url)', _);
        this.setState({
          couldPick: _,
        });
      }
    );
  };

  componentDidMount() {
    this.getColor();
  }

  render() {
    const cannotPickText = chrome.i18n.getMessage("cannotPick");

    return (
      <div id="home">
        {this.state.couldPick ? (
          <button
            className="pickerBtn"
            style={{ backgroundColor: this.state.hexColor }}
            onClick={this.pickColor}
          >
            Start
          </button>
        ) : (
          <p className="cannotPick">{cannotPickText}</p>
        )}

        <div
          className="copyGroup"
          style={{ backgroundColor: this.state.rgbColor }}
        >
          <span className="copy-item">{this.state.rgbColor}</span>
          <span className="copy-item">{this.state.hexColor}</span>
          <span className="copy-item">{this.state.hslColor}</span>
        </div>
      </div>
    );
  }
}
