import React, { Component } from 'react';
import crossfilter from 'crossfilter';

class Crossfilter extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    const { data, attributes} = this.props;
    const cfData         = crossfilter(data);
    const dimensions     = {};
    const groups         = {};
    const dimensionTypes = {};

    attributes.map(attribute => {
      dimensions[attribute.name]     = cfData.dimension(attribute.dimension);
      groups[attribute.name]         = dimensions[attribute.name].group(attribute.group || ((data) => data));
      dimensionTypes[attribute.name] = attribute.type;
    });

    const cf = {
      crossfilter   : cfData,
      dataset       : cfData.groupAll(),
      dimensionTypes: dimensionTypes,
      dimensions    : dimensions,
      groups        : groups,
      onFilter      : this.handleFilter.bind(this)
    };

    this.setState({
      cf: cf
    })
  }

  handleFilter(data) {
    if (data.clear || data.values.length == 0) {
      data.dimension.filterAll()
    } else if (data.ordinal) {
      data.dimension.filterFunction((d) => {
        return data.values.indexOf(d) >= 0;
      });
    } else {
      data.dimension.filter(data.values);
    }

    /* this is my shortcut to force re-rendering
    I should probably make it better. */
    this.setState({ts: Date.now()});
  }

  render() {
    const {children} = this.props;

    return (
      <div>
        {
          React.Children.map(children, child => {
            return React.cloneElement(child, {
              cf: this.state.cf
            })
          })
        }
      </div>
    )
  }
}

export default Crossfilter;