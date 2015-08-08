import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Connector } from 'react-redux';

import * as cfActions from '../actions/CrossfilterActions.js';

import crossfilter from 'crossfilter';
import Panel from '../components/panel';
import StickPlot from '../components/stickPlot';
import HistogramPlot from '../components/histogramPlot';

import Dashboard from '../components/dashboard';

export default class Demo extends Component {

  render() {
    return (
      <Connector select={state => ({ appData: state.crossfilterdata })}>
        {this.renderChart.bind(this)}
      </Connector>
    );
  }

  renderChart({ appData, dispatch }) {

    const actions    = bindActionCreators(cfActions, dispatch);
    const plotWidth  = 500;
    const plotHeight = 100;

    // const containerWidth = React.findDOMNode(this.refs.plot).offsetWidth;
    return (
      <div>
        <Dashboard actions={actions} data={appData} />
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