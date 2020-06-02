// import _ from 'lodash'
import React, { Component, Fragment } from "react";
import _ from "lodash";
import Pointer from "./Pointer.jsx";
import { startCapture } from "../../service";

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isStart: false,
			lastScrollTop: 0,
			lastWidth: window.innerWidth,
		};
	}

	scrollHandler = _.debounce(
		() => {
			const diffDistance = Math.abs(window.scrollY - this.state.lastScrollTop);
			document.body.classList.add("cp-waiting");

			this.setState({
				lastScrollTop: window.scrollY,
				isStart: false,
			});

			if (!diffDistance) {
				this.captureScreen();
			} else {
				this.scrollHandler();
			}
		},
		300,
		{
			leading: true,
		}
	);

	resizeHandler = _.debounce(
		() => {
			const diffWidth = Math.abs(window.innerWidth - this.state.lastWidth);
			document.body.classList.add("cp-waiting");
			this.setState({
				lastWidth: window.innerWidth,
				isStart: false,
			});

			if (!diffWidth) {
				this.captureScreen();
			} else {
				this.resizeHandler();
			}
		},
		300,
		{
			leading: true,
		}
	);

	captureScreen = () => {
		const width = window.innerWidth;
		const height = window.innerHeight;

		startCapture({ width, height }).then((data) => {
			document.body.classList.remove("cp-waiting");
			!this.state.isStart &&
				this.setState({
					isStart: data,
				});
		});
	};

	UNSAFE_componentWillMount() {
		this.captureScreen();
		window.addEventListener("scroll", this.scrollHandler, false);
		window.addEventListener("resize", this.resizeHandler, false);
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.scrollHandler, false);
		window.removeEventListener("resize", this.resizeHandler, false);
	}

	render() {
		const { isStart } = this.state;

		return (
			<Fragment>
				<Pointer isStart={isStart} />
			</Fragment>
		);
	}
}
