import React, { PropTypes, Component } from 'react';
import d3 from 'd3';

class OrdinalQuantityPlot extends Component {
  constructor() {
    super();
    this.state = {
      svg   : null,
      xAxis : null,
      yAxis : null,
      xScale: null,
      yScale: null,
      height: null,
      width : null,
    }
  }

  render() {
    return (
      <div ref="plot">
      </div>
    );
  }

  componentDidUpdate() {
    this.renderPlot();
  }

  componentDidMount() {
    this.createChartComponents();
  }

  createChartComponents() {
    const margin = this.props.margin;
    const width  = this.props.width - margin.left - margin.right;
    const height = this.props.height - margin.top - margin.bottom;

    const xScale = d3.scale.linear().range([0, width]);
    const yScale = d3.scale.ordinal().rangeRoundBands([0, height], 0.1);

    const xAxis = d3.svg.axis().scale(xScale).orient("top").tickSize(-height);
    const yAxis = d3.svg.axis().scale(yScale).orient("left").tickSize(0);


    let canvas = d3.select(React.findDOMNode(this.refs.plot)).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const svg = canvas.append("g")
      .attr("class", "plot")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //svg.append("g")
    //  .attr("class", "x axis")
    //  //.attr("transform", "translate(0," + height + ")")
    //  .call(xAxis);

    svg.append("g")
      .attr("class", "x axis")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);


    this.setState({
      svg   : svg,
      height: height,
      width : width,
      xScale: xScale,
      yScale: yScale,
      yAxis : yAxis,
      xAxis : xAxis
    })
  }

  renderPlot() {
    const {svg, xScale, yScale, height, width, xAxis, yAxis} = this.state;
    const {group, currentFilter} = this.props;

    const data = group.all();
    xScale.domain([0, group.top(1)[0].value]);
    yScale.domain(data.map(d => d.key));

    svg.select('.x.axis').call(xAxis);
    svg.select('.y.axis').call(yAxis);

    const bars = svg.selectAll(".bar").data(data);

    bars.enter()
      .append("g")
      .attr("class", "bar")
      .attr("transform", function (d) {
        return "translate(0," + yScale(d.key) + ")";
      })
      .append("rect");

    bars.selectAll("rect")
      .attr("width", function (d) {
        return xScale(d.value);
      })
      .attr("height", yScale.rangeBand())
      .style("fill", d => {
        const isFilter = currentFilter.indexOf(d.key) >= 0;
        return isFilter ? "orange" : "steelblue"
      })
      .on("click", this.handleClick.bind(this));

    bars.exit()
      .remove();
  }

  handleClick(d) {
    const {dimension, onClick, currentFilter} = this.props;

    let values = currentFilter;

    const isFilter = currentFilter.indexOf(d.key) >= 0;
    if (isFilter) {
      values.splice(currentFilter.indexOf(d.key), 1)
    } else {
      values = [...currentFilter, d.key]
    }

    onClick({
      dimension: dimension,
      values   : values,
      ordinal : true
      // function : (d, values) => values.indexOf(d) >= 0
    });
  }
}

export default OrdinalQuantityPlot
