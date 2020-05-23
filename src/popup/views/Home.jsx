import React, { PureComponent } from "react";

export default class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hexColor: "",
      rgbColor: "",
    };
  }

  getColor() {
    chrome.runtime.sendMessage(
      {
        command: "lastColor",
      },
      (colors = []) => {
        const [hex, rgb] = colors;
        this.setState({
          hexColor: hex || "#fff",
          rgbColor: rgb || "rgb(255,255,255)",
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
    return (
      <div id="home">
        <button
          className="pickerBtn"
          style={{ borderColor: this.state.hexColor }}
          onClick={this.pickColor}
        >
          <i className="pc-iconfont"></i>
        </button>
      </div>
    );
  }
}
