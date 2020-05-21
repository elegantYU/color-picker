// import _ from 'lodash'
import React, { Component, Fragment } from "react";
import _ from "lodash";
import Pointer from "./Pointer.jsx";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isStart: false,
      lastScrollTop: 0,
    };
    window.onscroll = (e) => this.scrollHandler(e);
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
    return (
      <Fragment>
        <Pointer isStart={this.state.isStart} />
      </Fragment>
    );
  }
}
