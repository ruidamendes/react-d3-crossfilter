import React, { Component } from 'react/addons';
import Radium from 'radium';
import {style} from './style.js'

@Radium class Dashboard extends Component {
  render() {
    const {name, children} = this.props;
    return (
      <div style={style.base}>
        <div style={style.header.base}>
          <span style={style.header.text}>{name}</span>
        </div>
        <div style={style.content.base} ref="content">
          {children}
        </div>
      </div>
    );
  }
}

export default Dashboard;