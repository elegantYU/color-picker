import React, { Component } from "react";
import { lastSevenDay } from "../../service";

export default class History extends Component {
	constructor(props) {
		super(props);

		this.state = {
			colorGroups: [],
		};
	}

	getLastSevenDay = () => {
		lastSevenDay().then((_) => {
			this.setState({
				colorGroups: _,
			});
		});
	};

	UNSAFE_componentWillMount() {
		this.getLastSevenDay();
	}

	render() {
    const anchorHistory = chrome.i18n.getMessage("anchorHistory");
    const { colorGroups } = this.state

		return (
			<div id="history">
				<h1>{anchorHistory}</h1>
        <div className="history-grid">
          {
            colorGroups.map(v => v)
          }
        </div>
			</div>
		);
	}
}
