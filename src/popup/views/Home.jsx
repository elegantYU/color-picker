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

  UNSAFE_componentDidMount() {
    this.getColor();
  }

  render() {
    console.log('state', this);
    const color = this.hexColor;
    return (
      <div id="home">
        <div className="pickerBtn" style={{ "border-color": color }}>
          <i className="pc-iconfont"></i>
        </div>
      </div>
    );
  }
}
