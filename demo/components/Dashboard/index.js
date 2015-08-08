import React, { Component } from 'react';
import Radium from 'radium';
import {style} from './style.js'

import Panel from './panel';
import AttributeExplorer from '../attributeExplorer';
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
        {type: 'ordinal', name: 'Survived?', function: (row) => row.survived}
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
    return (
      <Panel key={dimension} name={dimension}>
        <AttributeExplorer key={dimension}
                           name={dimension}
                           type={data.dimensionTypes[dimension]}
                           dimension={data.dimensions[dimension]}
                           group={data.grps[dimension]}
                           actions={actions}/>
      </Panel>
    )
  }
}

export default Dashboard;