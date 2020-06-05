import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ToolTip extends Component {
	render() {
		const { text, afterText, status } = this.props;
		const fillText = status ? afterText : text;

		return <div className="tips">{fillText}</div>;
	}
}

ToolTip.propTypes = {
	text: PropTypes.string,
	afterText: PropTypes.string,
	status: PropTypes.bool,
};
