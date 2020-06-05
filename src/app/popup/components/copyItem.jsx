import React, { Component } from "react";
import PropTypes from "prop-types";
import ToolTip from "./toolTip";

export default class CopyItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hover: false,
			clicked: false,
		};
	}

	clickHandler = () => {
		// 复制
		const { text } = this.props;
		const tempInput = document.createElement("input");
		document.body.appendChild(tempInput);
		tempInput.value = text;
		tempInput.select();
		document.execCommand("copy");
		document.body.removeChild(tempInput);

		this.setState({
			clicked: true,
		});
	};

	mouseEnterHandler = () => {
		this.setState({
			hover: true,
		});
	};

	mouseOutHandler = () => {
		this.setState({
      hover: false,
      clicked: false,
		});
	};

	render() {
		const { text } = this.props;
		const { clicked, hover } = this.state;
		const copyText = chrome.i18n.getMessage("copy");
		const copiedText = chrome.i18n.getMessage("copied");

		return (
			<div
				className="copy-item"
				onClick={this.clickHandler}
				onMouseEnter={this.mouseEnterHandler}
				onMouseOut={this.mouseOutHandler}
			>
				{text}
				{hover && <ToolTip text={copyText} afterText={copiedText} status={clicked} />}
			</div>
		);
	}
}

CopyItem.propTypes = {
	text: PropTypes.string,
};
