import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'

export default class Nav extends PureComponent {
  render() {
    return (
      <div id="nav">
        <div className="nav_group">
          <NavLink to="/home" activeClassName="active">取色</NavLink>
        </div>
        <div className="setting-btn">
          <NavLink to="/setting" activeClassName="active" className="cp-iconfont cp-setting"></NavLink>
        </div>
      </div>
    )
  }
}
