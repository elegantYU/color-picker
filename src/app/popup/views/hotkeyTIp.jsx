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

  UNSAFE_componentWillMount() {
    this.checkTip();
  }

  render() {
    const hotkeyText = chrome.i18n.getMessage("hotkeyTip");
    const { hotkeyTip } = this.state

    return (
      <Fragment>
        {hotkeyTip && (
          <div className="hotkey-tip">
            <span>{hotkeyText}</span>
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
