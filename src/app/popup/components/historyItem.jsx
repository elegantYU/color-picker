import React, { Component } from "react";
import PropTypes from "prop-types";
import ToolTip from "./toolTip";

export default class Item extends Component {
	constructor(props) {
		super(props);

		this.state = {
			clicked: false,
			hover: false,
		};
	}

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

	clickHandler = () => {
		// 复制
		const { color } = this.props;
		const tempInput = document.createElement("input");
		document.body.appendChild(tempInput);
		tempInput.value = color;
		tempInput.select();
		document.execCommand("copy");
		document.body.removeChild(tempInput);

		this.setState({
			clicked: true,
		});
	};

	render() {
		const { color } = this.props;
		const { clicked, hover } = this.state;
		const copiedText = chrome.i18n.getMessage("copied");

		return (
			<div
				className="history-item"
				style={{ backgroundColor: color }}
				onMouseEnter={this.mouseEnterHandler}
        onMouseOut={this.mouseOutHandler}
        onClick={this.clickHandler}
			>
				{hover && <ToolTip text={color} afterText={copiedText} status={clicked} />}
			</div>
		);
	}
}

Item.propTypes = {
	color: PropTypes.string,
};
