import React, { Component, Fragment } from "react";

export default class HotkeyTip extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hotkeyTip: true,
			isEnter: false,
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

	componentDidMount = () => {
		setTimeout(() => {
			this.setState({ isEnter: true });
		}, 200);
	};

	render() {
		const hotkeyText = chrome.i18n.getMessage("hotkeyTip");
		const { hotkeyTip, isEnter } = this.state;
		const enterClass = isEnter && hotkeyTip ? "slideUp" : "";
		const exitClass = !hotkeyTip ? "slideDown" : "";
		const classname = `${exitClass} ${enterClass}`;

		return (
			<Fragment>
				{hotkeyTip && (
					<div className={`hotkey-tip ${classname}`}>
						<span>{hotkeyText}</span>
						<i className="cp-iconfont cp-searchclose" onClick={this.closeTip}></i>
					</div>
				)}
			</Fragment>
		);
	}
}
