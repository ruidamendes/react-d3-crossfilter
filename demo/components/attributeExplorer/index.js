import React, { Component } from 'react';

import HistogramPlot from '../plotting/histogramPlot';
import OrdinalQuantityPlot from '../plotting/ordinalQuantity';

class AttributeExplorer extends Component {
  constructor() {
    super();
    this.state = {
      width : null,
      filter: []
    }
  }

  render() {
    const {name, type} = this.props;

    return (
      <div ref="content" style={{width: '100%'}}>
        {this.renderVisualization()}
      </div>
    );
  }

  renderVisualization() {
    const {type, group} = this.props;
    const {width} = this.state;

    if (width === null) {
      return null;
    }

    switch (type) {
      case 'linear':
        return (
          <HistogramPlot
            {...this.props}
            onBrush={this.handleFilter.bind(this)}
            width={width}
            height={100}
            margin={{top: 5, right: 1, bottom: 25, left: 1}}/>
        );

      case 'ordinal':
        return (
          <OrdinalQuantityPlot
            {...this.props}
            onClick={this.handleFilter.bind(this)}
            currentFilter={this.state.filter}
            width={width}
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

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.setState({width: React.findDOMNode(this.refs.content).offsetWidth});
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  handleResize() {
    this.setState({width: React.findDOMNode(this.refs.content).offsetWidth});
  }


}

export default AttributeExplorer;