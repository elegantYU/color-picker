import React, { Component } from "react";
import PropTypes from "prop-types";
import { createTab } from "../../service";

export default class Header extends Component {
	gotoEvaluation = () => {
		// goto 评价
		const params = {
			url: "https://github.com/elegantYU/color-picker",
			active: true,
		};
		createTab(params);
	};

	render() {
		const logo = chrome.runtime.getURL("static/icons/icon128.png");
		const gotoStar = chrome.i18n.getMessage("starMe");

		// 事件绑定函数别加括号啊...
		return (
			<div className="header">
				<h1 onClick={this.gotoEvaluation} title={gotoStar}>
					<img src={logo} alt="" />
					Color Picker
				</h1>
			</div>
		);
	}
}

// 使用Proptypes进行类型检查
Header.propTypes = {
	openSetting: PropTypes.func,
};
