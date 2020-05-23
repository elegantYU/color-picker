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

      if (!diffDistance) {
        this.captureScreen();
      } else {
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

    if (!diffWidth) {
      this.captureScreen();
    } else {
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
    return <Fragment><Pointer isStart={this.state.isStart} /></Fragment>;
  }
}
