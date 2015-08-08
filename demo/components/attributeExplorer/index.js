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
            currentFilter={this.state.filter}
            width={500}
            height={group.size()*50}
            margin={{top: 20, right: 1, bottom: 25, left: 50}}/>
        );
    }
  }

  handleFilter(data) {
    const {actions, type} = this.props;
     actions.filteredDimension(data);

    switch (type) {
      case 'ordinal':
        this.setState({filter: data.values});
        break;
    }

  }
}

export default AttributeExplorer;