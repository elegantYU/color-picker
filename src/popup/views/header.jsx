import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";

@withRouter
export default class RouterHeader extends Component {
  constructor(props) {
    super(props);

    const routerHome = chrome.i18n.getMessage("routerHome");
    const routerHistory = chrome.i18n.getMessage("routerHistory");
    const routerSetting = chrome.i18n.getMessage("routerSetting");

    this.routerMap = new Map([
      ["/", routerHome],
      ["/home", routerHome],
      ["/history", routerHistory],
      ["/setting", routerSetting],
    ]);
    this.state = {
      isShow: false,
      title: routerHome,
    };
  }

  clickHandler = () => {
    const { ...props } = this.props;
    const { pathname } = props.location;

    if (pathname === "/home" || pathname === "/") {
      this.setState({
        isShow: true,
      });
    } else {
      props.history.goBack();
    }
  };

  componentDidMount() {
    this.props.history.listen((location) => {
      const currentPath = location.pathname
      if (this.props.location.pathname !== currentPath) {
        // 路由发生了变化
        this.setState({
          title: this.routerMap.get(currentPath),
        });
      }
    });
  }

  render() {
    // 事件绑定函数别加括号啊...
    return (
      <div className="header">
        <h1>{this.state.title}</h1>
        {/* <i className="cp-iconfont cp-setting" onClick={this.clickHandler}></i> */}
        {this.state.isShow && (
          <div id="footer-nav">
            <Link className="nav-block">历史记录</Link>
            <Link className="nav-block" to="/setting">设置</Link>
          </div>
        )}
      </div>
    );
  }
}

// 使用Proptypes进行类型检查
RouterHeader.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
};