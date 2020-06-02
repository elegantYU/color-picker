import React, { Component } from "react";
import Panel from "./Panel.jsx";
import { convertRgbToHex } from "../../utils";
import { slideFetch, destory } from "../../service";

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isMove: false,
			top: null,
			left: null,
			centerColor: "rgb(255,255,255)",
			centerColorHex: "#FFFFFF",
			colorGroups: [],
		};
	}

	mousemoveHandler = (e) => {
		const OFFSET = 85;
		// 此时为pointer的client 非鼠标client
		this.setState({
			top: e.clientY - OFFSET,
			left: e.clientX - OFFSET,
		});

		if (!this.state.isMove) {
			this.setState({
				isMove: true,
			});
		}

		const centerX = this.state.left;
		const centerY = this.state.top;

		slideFetch({ centerX, centerY }).then((colorGroups) => {
			const midIdx = Math.floor(colorGroups.length / 2);

			this.setState({
				colorGroups,
				centerColor: colorGroups[midIdx],
				centerColorHex: convertRgbToHex(colorGroups[midIdx]),
			});
		});
	};

	clickHandler = () => {
		// 先复制再关闭
		const color = this.state.centerColor;
		const tempInput = document.createElement("input");
		document.body.appendChild(tempInput);
		tempInput.value = this.state.centerColorHex;
		tempInput.select();
		if (document.execCommand("copy")) {
			document.execCommand("copy");
		}
		document.body.removeChild(tempInput);

		destory({ color });
	};

	render() {
		const { ...props } = this.props;
		const { isStart } = props;
		const { top, left, colorGroups, centerColor, centerColorHex, isMove } = this.state;

		return (
			<div id="ColorPickerPointer" onMouseMove={(e) => this.mousemoveHandler(e)}>
				{isStart && isMove && (
					<div
						className="pointer"
						style={{
							borderColor: centerColor,
							top: `${top}px`,
							left: `${left}px`,
						}}
						onClick={(e) => this.clickHandler(e)}
					>
						{colorGroups.map((item, i) => (
							<div
								className="pointer-grid-item"
								key={i}
								style={{ backgroundColor: item || "rgb(255,255,255)" }}
							></div>
						))}

						<div className="centerBlock"></div>
						<div className="floatTip">{centerColorHex}</div>
					</div>
				)}
				{isStart && <Panel currentColor={centerColor} currentColorHex={centerColorHex} />}
			</div>
		);
	}
}
