import React, { Component, Fragment } from "react";

export default class HotkeyTip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hotkeyTip: true,
    };
  }

  closeTip = () => {
    this.setState({
      hotkeyTip: false,
    });

    localStorage.setItem("hotkeyTip-close", true);
  };

  checkTip = () => {
    const closed = localStorage.getItem("hotkeyTip-close") || false;
    this.setState({
      hotkeyTip: !closed,
    });
  };

  componentDidMount() {
    this.checkTip();
  }

  render() {
    const hotkeyTip = chrome.i18n.getMessage("hotkeyTip");

    return (
      <Fragment>
        {this.state.hotkeyTip && (
          <div className="hotkey-tip">
            <span>{hotkeyTip}</span>
            <i
              className="cp-iconfont cp-searchclose"
              onClick={this.closeTip}
            ></i>
          </div>
        )}
      </Fragment>
    );
  }
}
