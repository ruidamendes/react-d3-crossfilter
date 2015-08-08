import React, { Component } from 'react';

import HistogramPlot from '../histogramPlot';
import OrdinalQuantityPlot from '../ordinalQuantity';

class AttributeExplorer extends Component {
  constructor() {
    super();
    this.state = {filter: []}
  }

  componentDidMount() {
  }

  render() {
    const {name, type} = this.props;

    return (
      <div>
        <pre><h1>{name} / {type}</h1></pre>
        {this.renderVisualization()}
      </div>
    );
  }

  renderVisualization() {
    const {type, name, dimension, group, actions} = this.props;
    console.log(name, this.state);

    switch (type) {
      case 'linear':
        return (
          <HistogramPlot
            {...this.props}
            onBrush={this.handleFilter.bind(this)}
            width={500}
            height={100}
            margin={{top: 5, right: 1, bottom: 25, left: 1}}/>
        );

      case 'ordinal':
        return (
          <OrdinalQuantityPlot
            {...this.props}
            onClick={this.handleFilter.bind(this)}
            width={500}
            height={group.size()*50}
            margin={{top: 20, right: 1, bottom: 25, left: 50}}/>
        );
    }

    //if (data.dimensionTypes[dimension] === 'linear') {
    //  plot = (
    //
    //  )
    //} else {
    //  plot = (
    //
    //}

  }

  handleFilter(data) {
    const {actions, type} = this.props;
     actions.filteredDimension(data);

    const filters = [
      data.values,
      ...this.state.filter
    ];

    switch (type) {
      case 'ordinal':
        this.setState({filter: filters});
        break;
    }

  }
}

export default AttributeExplorer;