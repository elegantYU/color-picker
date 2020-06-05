import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default class RouterHeader extends Component {
  render() {
    const logo = chrome.runtime.getURL('static/icons/icon128.png')

    // 事件绑定函数别加括号啊...
    return (
      <div className="header">
        <h1>
          <img src={logo} alt=""/>
          Color Picker
        </h1>
        <Link className="cp-iconfont cp-huaban" to="/setting" />
      </div>
    );
  }
}

// 使用Proptypes进行类型检查
RouterHeader.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
};