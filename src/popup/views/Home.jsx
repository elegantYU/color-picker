import React, { PureComponent } from "react";

export default class Home extends PureComponent {
  constructor(props) {
    super(props)

    this.hexColor = ""
    this.rgbColor = ""
  }

  getColor() {
    chrome.runtime.sendMessage(
      {
        command: "lastColor",
      },
      (colors = []) => {
        const [hex, rgb] = colors;
        this.hexColor = hex || "#fff"
        this.rgbColor = rgb || "rgb(255,255,255)"
      }
    );
  }

  componentDidMount() {
    this.getColor();
  }

  render() {
    const color = this.hexColor;
    return (
      <div id="home">
        <div className="pickerBtn" style={{ "borderColor": color }}>
          <i className="pc-iconfont"></i>
        </div>
      </div>
    );
  }
}
