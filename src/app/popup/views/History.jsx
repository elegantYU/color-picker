import React, { Component } from "react";
import { lastSevenDay } from "../../service";
import { convertRgbToHex } from '../../utils'
import Item from '../components/historyItem'

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
		const historyTip = chrome.i18n.getMessage("historyTip")
    const colorGroups = this.state.colorGroups.map(v => convertRgbToHex(v))

		return (
			<div id="history">
				<h1>{anchorHistory}</h1>
        <div className="history-grid">
          {
            colorGroups.map(v => (
							<Item color={v} key={v} />
						))
          }
        </div>
				<p>{ historyTip }</p>
			</div>
		);
	}
}
