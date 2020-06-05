import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Header extends Component {
  gotoEvaluation = () => {
    // goto 评价
  }

	render() {
		const logo = chrome.runtime.getURL("static/icons/icon128.png");
		// const { openSetting } = this.props;

		// 事件绑定函数别加括号啊...
		return (
			<div className="header">
				<h1 onClick={ this.gotoEvaluation }>
					<img src={logo} alt="" />
					Color Picker
				</h1>
				{/* <i className="cp-iconfont cp-huaban" onClick={openSetting(true)}></i> */}
			</div>
		);
	}
}

// 使用Proptypes进行类型检查
Header.propTypes = {
	openSetting: PropTypes.func,
};
