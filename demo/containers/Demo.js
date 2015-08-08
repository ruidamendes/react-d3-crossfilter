import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Connector } from 'react-redux';

import * as cfActions from '../actions/CrossfilterActions.js';

import crossfilter from 'crossfilter';
import Dashboard from '../components/dashboard';

export default class Demo extends Component {
  constructor() {
    super();
    this.state = {seed: 0}
  }

  render() {
    return (
      <Connector select={state => ({ appData: state.crossfilterdata })}>
        {this.renderDashboard.bind(this)}
      </Connector>
    );
  }

  renderDashboard({ appData, dispatch }) {
    const actions = bindActionCreators(cfActions, dispatch);
    return (
      <div>
        <Dashboard actions={actions} data={appData}/>
      </div>
    );
  }
}