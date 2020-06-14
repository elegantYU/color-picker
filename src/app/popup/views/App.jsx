import React, { PureComponent } from "react";
import HotkeyTip from "../components/hotkeyTIp";
import Home from "./Home";
// import Profile from "./Profile";

export default class App extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			isProfile: false,
		};
	}

	profilePageHandler = (status) => {
		this.setState({
			isProfile: status,
		});
	};

	render() {
		return (
			<div className="app">
				<Home openSetting={this.profilePageHandler} />
				<HotkeyTip />
			</div>
		);
	}
}
