import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Connector } from 'react-redux';

import * as cfActions from '../actions/CrossfilterActions.js';

import crossfilter from 'crossfilter';
import Dashboard from '../components/dashboard';

import ResponsiveD3 from '../components/responsiveD3';

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
    const data = [];
    for (let i = 0; i < 500; i++) {
      data.push({
        x: Math.random() * 100,
        y: Math.random() * 100
      })
    }

    const config = {
      margin: {top: 20, right: 20, bottom: 30, left: 40},
      axes  : {
        x: {
          min : 0,
          max : 100,
          show: true
        },
        y: {
          min : 0,
          max : 100, // Math.random() * 1000,
          show: true
        }
      },
      series: [
        {type: 'scatter', data: data, xAccessor: d => d.x, yAccessor: d => d.y}
      ]
    };

    const height = 500; // Math.random() * 500 + 200;
    const width  = 500; // Math.random() * 400 + 200;

    return (
      <div>
        <Dashboard actions={actions} data={appData}/>

        <div style={{width: '100%', height: `${height}px`, border: '1px solid black'}}>
          <ResponsiveD3 config={config}/>
        </div>
      </div>
    );
  }
}

/*
 <Panel name="First Metric">
 <HistogramPlot
 dimension={appData.dims.a}
 group={appData.groups.a}
 onBrush={actions.filteredDimension}
 width={plotWidth}
 height={plotHeight}
 margin={{top: 5, right: 1, bottom: 25, left: 1}}/>
 </Panel>

 <Panel name="Second Metric">
 <HistogramPlot
 dimension={appData.dims.b}
 group={appData.groups.b}
 onBrush={actions.filteredDimension}
 width={plotWidth}
 height={plotHeight}
 margin={{top: 5, right: 1, bottom: 25, left: 1}}/>
 </Panel>
 <Panel name="Third Metric">
 <HistogramPlot
 dimension={appData.dims.c}
 group={appData.groups.c}
 onBrush={actions.filteredDimension}
 width={plotWidth}
 height={plotHeight}
 margin={{top: 5, right: 1, bottom: 25, left: 1}}/>
 </Panel>

 <pre>
 <h1>{appData.all.value()} match out of {appData.crossfilter.size()}</h1>
 <h2>Showing (up to) Top 10</h2>
 <ul>
 {appData.dims.a.top(10).map(d => <li key={d.index}>{d.a}, {d.b}, {d.c}</li>)}
 </ul>
 </pre>
 */