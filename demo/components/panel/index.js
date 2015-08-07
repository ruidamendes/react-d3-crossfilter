import React, { Component } from 'react';
import Radium from 'radium';
import {style} from './style.js'

@Radium class Panel extends Component {
  render() {
    const {name,children} = this.props;

    return (
      <div style={style.base}>
        <pre><h1 style={style.header}>{name}</h1></pre>
        {children}
      </div>
    );
  }
}

export default Panel;