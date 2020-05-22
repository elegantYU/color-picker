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

    window.onscroll = (e) => this.scrollHandler(e);
    window.onresize = (e) => this.resizeHandler(e);
  }

  scrollHandler = _.debounce(
    () => {
      const diffDistance = Math.abs(window.scrollY - this.state.lastScrollTop);
      this.setState({
        lastScrollTop: window.scrollY,
        isStart: false,
      });
      chrome.runtime.sendMessage({ command: "waiting" });

      if (!diffDistance) {
        document.body.classList.remove("color-picker-waiting");
        this.captureScreen();
      } else {
        const hasClass = Array.from(document.body.classList).filter(v => v === 'color-picker-waiting')
        !hasClass && document.body.classList.add("color-picker-waiting");
        this.scrollHandler();
      }
    },
    250,
    {
      leading: true,
    }
  );

  resizeHandler = _.debounce(() => {
    const diffWidth = Math.abs(window.innerWidth - this.state.lastWidth);
    this.setState({
      lastWidth: window.innerWidth,
      isStart: false,
    });
    chrome.runtime.sendMessage({ command: "waiting" });

    if (!diffWidth) {
      document.body.classList.remove("color-picker-waiting");
      this.captureScreen();
    } else {
      const hasClass = Array.from(document.body.classList).filter(v => v === 'color-picker-waiting')
      !hasClass && document.body.classList.add("color-picker-waiting");
      this.resizeHandler();
    }
  });

  captureScreen = () => {
    chrome.runtime.sendMessage(
      {
        command: "startCapture",
        data: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
      },
      data => {
        this.setState({
          isStart: data,
        });
      }
    );
  };

  componentDidMount() {
    this.captureScreen();
  }

  render() {
    return <Fragment>{this.state.isStart && <Pointer />}</Fragment>;
  }
}
