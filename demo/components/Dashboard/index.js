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
      attributes: [
        {
          type     : 'linear',
          name     : 'Age',
          dimension: row => +row.age,
          grouper  : data => data
        },
        {
          type     : 'ordinal',
          name     : 'Boat',
          dimension: row => +row.boat, // heh
          grouper  : data => data
        },
        {
          type     : 'ordinal',
          name     : 'Class',
          dimension: row => row.pclass,
          grouper  : data => data
        },
        {
          type     : 'ordinal',
          name     : 'Gender',
          dimension: row => row.sex,
          grouper  : data => data
        },
        {
          type     : 'ordinal',
          name     : 'Survived?',
          dimension: row => row.survived,
          grouper  : data => data
        },
        {
          type     : 'ordinal',
          name     : 'Age available in data?',
          dimension: row => row.age !== null,
          grouper  : data => data
        },
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
                           group={data.groups[dimension]}
                           actions={actions}/>
      </Panel>
    )
  }
}

export default Dashboard;