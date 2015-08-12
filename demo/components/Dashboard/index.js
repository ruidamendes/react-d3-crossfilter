import React, { Component } from 'react';
import Radium from 'radium';
import {style} from './style.js'

import Panel from './panel';
import AttributeExplorer from '../attributeExplorer';

@Radium class Dashboard extends Component {
  render() {
    const {cf} = this.props;
    const dimensionBlock = [];
    for (let dimension in cf.dimensions) {
      dimensionBlock.push(this.renderDimension(dimension));
    }

    return (
      <div style={style.base}>
        {dimensionBlock}
      </div>
    );
  }

  renderDimension(dimension) {
    const {actions, cf} = this.props;
    return (
      <Panel key={dimension} name={dimension}>
        <AttributeExplorer key={dimension}
                           name={dimension}
                           type={cf.dimensionTypes[dimension]}
                           dimension={cf.dimensions[dimension]}
                           group={cf.groups[dimension]}
                           onFilter={cf.onFilter}/>
      </Panel>
    )
  }
}

export default Dashboard;