import React, { PureComponent, Fragment } from "react";
import RouterHeader from './header'
import CopyItem from "./copyItem";
import History from "./History";
import { lastColor, activeTab, create } from "../../service";
import { convertRgbToHex, convertRgbToHsl, convertRgbToHsv } from "../../utils";

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
		create();
	};

	checkTabAvailability = () => {
		activeTab().then((data) => {
			this.setState({
				couldPick: data,
			});
		});
	};

	getRandomBg = () => {
		const LENGTH = 15;
		const colorClass = [];
		for (let i = 0; i < LENGTH; i++) {
			colorClass.push(`linearColor${i + 1}`);
		}
		const index = Math.floor(Math.random() * colorClass.length);

		return colorClass[index];
	};

	UNSAFE_componentWillMount() {
		this.checkTabAvailability();
		this.getColor();
	}

	render() {
		const cannotPickText = chrome.i18n.getMessage("cannotPick");
		const anchorHome = chrome.i18n.getMessage("anchorHome");
		const { colors, couldPick } = this.state;
		const randomLinear = this.getRandomBg();

		return (
			<Fragment>
				<RouterHeader />
				<div className="content">
					<div id="home">
						<h1>{anchorHome}</h1>
						{couldPick ? (
							<button className={`pickerBtn ${randomLinear}`} onClick={this.pickColor}>
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
					<History />
				</div>
			</Fragment>
		);
	}
}
