import React, { Component } from "react";
import PropTypes from "prop-types";

export default class CopyItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
    };
  }

  clickHandler = () => {
    // 复制
    const TEXT = this.props.text;
    const tempInput = document.createElement("input");
    document.body.appendChild(tempInput);
    tempInput.value = TEXT;
    tempInput.select();
    if (document.execCommand("copy")) {
      document.execCommand("copy");
    }
    document.body.removeChild(tempInput);

    this.setState({
      clicked: true,
    });
  };

  render() {
    const TEXT = this.props.text;
    const copyText = chrome.i18n.getMessage("copy");
    const copiedText = chrome.i18n.getMessage("copied");

    return (
      <div className="copy-item" onClick={this.clickHandler}>
        {TEXT}
        <div className="tips">{this.state.clicked ? copiedText : copyText}</div>
      </div>
    );
  }
}

CopyItem.propTypes = {
  text: PropTypes.string,
};
