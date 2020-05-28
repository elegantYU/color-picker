import React, { PureComponent } from "react";
import { convertRgbToHex, convertRgbToHsl, convertRgbToHsv } from "../utils";
import CopyItem from "./copyItem";
import HotkeyTip from './hotkeyTIp'

export default class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hexColor: "",
      rgbColor: "",
      hslColor: "",
      hsvColor: "",
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
        const hsv = convertRgbToHsv(color);

        this.setState({
          hexColor: hex,
          rgbColor: color,
          hslColor: hsl,
          hsvColor: hsv,
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
        <HotkeyTip />
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
          <CopyItem text={this.state.rgbColor} />
          <CopyItem text={this.state.hexColor} />
          <CopyItem text={this.state.hslColor} />
          <CopyItem text={this.state.hsvColor} />
        </div>
      </div>
    );
  }
}
