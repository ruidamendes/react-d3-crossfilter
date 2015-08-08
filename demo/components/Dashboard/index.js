import React, { Component } from 'react';
import Radium from 'radium';
import {style} from './style.js'

import HistogramPlot from '../histogramPlot';
import OrdinalQuantityPlot from '../ordinalQuantity';
import titanic from '../../data/titanic';

@Radium class Dashboard extends Component {

  componentDidMount() {
    const {actions} = this.props;
    actions.createdCrossfilter({
      dataset   : titanic,
      dimensions: [
        {type: 'linear', name: 'Age', function: (row) => +row.age},
        {type: 'linear', name: 'Boat', function: (row) => +row.boat},
        {type: 'ordinal', name: 'Class', function: (row) => row.pclass},
        {type: 'ordinal', name: 'Gender', function: (row) => row.sex},
        {type: 'ordinal', name: 'Survived?', function: (row) => {
          return (row.survived == '0') ? 'No' : 'Yes';
        }},
      ],
      groups    : [
        {name: 'Age', function: (data) => data},
        {name: 'Boat', function: (data) => data},
        {name: 'Class', function: (data) => data},
        {name: 'Survived?', function: (data) => data},
        {name: 'Gender', function: (data) => data}
      ]
    });
  }

  render() {
    const {data} = this.props;

    const dimensionBlock = [];
    for (let dimension in data.dimensions) {
      dimensionBlock.push(this.renderDimension(dimension));
    }

    return (
      <div style={style.base}>
        <pre><h1 style={style.header}>Dashboard</h1></pre>
        {dimensionBlock}
      </div>
    );
  }

  renderDimension(dimension) {
    const {actions, data} = this.props;

    let plot;
    if (data.dimensionTypes[dimension] === 'linear') {
      plot = (
        <HistogramPlot
          dimension={data.dimensions[dimension]}
          group={data.grps[dimension]}
          onBrush={actions.filteredDimension}
          width={500}
          height={100}
          margin={{top: 5, right: 1, bottom: 25, left: 1}}/>
      )
    } else {
      plot = (
        <OrdinalQuantityPlot
          dimension={data.dimensions[dimension]}
          group={data.grps[dimension]}
          onClick={actions.filteredDimension}
          width={500}
          height={data.grps[dimension].size()*50}
          margin={{top: 20, right: 1, bottom: 25, left: 50}}/>
      )
    }

    return (
      <div key={dimension}>
        <h1>Dimension: {dimension}</h1>
        {plot}
      </div>
    )
  }
}

export default Dashboard;