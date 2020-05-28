// import _ from 'lodash'
import React, { Component, Fragment } from "react";
import _ from "lodash";
import Pointer from "./Pointer.jsx";

export default class Home extends Component {
  constructor(props) {
    super(props);

    const width = window.innerWidth;
    this.state = {
      isStart: false,
      lastScrollTop: 0,
      lastWidth: width,
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
    chrome.runtime.sendMessage(
      {
        command: "startCapture",
        data: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
      },
      (data) => {
        document.body.classList.remove("cp-waiting");
        this.setState({
          isStart: data,
        });
      }
    );
  };

  componentDidMount() {
    this.captureScreen();
    window.addEventListener("scroll", this.scrollHandler, false);
    window.addEventListener("resize", this.resizeHandler, false);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollHandler, false);
    window.removeEventListener("resize", this.resizeHandler, false);
  }

  render() {
    return (
      <Fragment>
        <Pointer isStart={this.state.isStart} />
      </Fragment>
    );
  }
}
