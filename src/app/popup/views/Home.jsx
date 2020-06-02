import React, { PureComponent } from "react";
import { convertRgbToHex, convertRgbToHsl, convertRgbToHsv } from "../../utils";
import CopyItem from "./copyItem";
import HotkeyTip from "./hotkeyTIp";
import { lastColor, activeTab, create } from "../../service";

export default class Home extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			colors: [],
			couldPick: true,
		};
	}

	getColor() {
		lastColor().then((color) => {
			const hex = convertRgbToHex(color);
			const hsl = convertRgbToHsl(color);
			const hsv = convertRgbToHsv(color);

			this.setState({
				colors: [hex, color, hsl, hsv],
			});
		});
	}

	pickColor = () => {
    window.close();
		create()
	};

	checkTabAvailability = () => {
		activeTab().then((data) => {
			this.setState({
				couldPick: data,
			});
		});
	};

	UNSAFE_componentWillMount() {
		this.checkTabAvailability();
		this.getColor();
	}

	render() {
		const cannotPickText = chrome.i18n.getMessage("cannotPick");
		const { colors, couldPick } = this.state;

		return (
			<div id="home">
				<HotkeyTip />
				{couldPick ? (
					<button
						className="pickerBtn"
						style={{ backgroundColor: colors[0] }}
						onClick={this.pickColor}
					>
						Start
					</button>
				) : (
					<p className="cannotPick">{cannotPickText}</p>
				)}

				<div className="copyGroup" style={{ backgroundColor: colors[1] }}>
					{colors.map((color) => (
						<CopyItem key={color} text={color} />
					))}
				</div>
			</div>
		);
	}
}
