import React, { Component } from 'react';
import Radium from 'radium';

import d3 from 'd3';

@Radium class ResponsiveD3 extends Component {
  constructor() {
    super();
    this.state = {}
  }

  componentDidUpdate() {
    const {margin} = this.props.config;
    const width  = React.findDOMNode(this.refs.plot).offsetWidth - margin.left - margin.right;
    const height = React.findDOMNode(this.refs.plot).offsetHeight - margin.top - margin.bottom;
    this.refreshPlot(width, height);
  }

  componentDidMount() {
    const {margin} = this.props.config;
    const width   = React.findDOMNode(this.refs.plot).offsetWidth - margin.left - margin.right;
    const height  = React.findDOMNode(this.refs.plot).offsetHeight - margin.top - margin.bottom;
    const x       = d3.scale.linear().range([0, width]);
    const y       = d3.scale.linear().range([height, 0]);
    const xAxis   = d3.svg.axis().scale(x).orient("bottom");
    const yAxis   = d3.svg.axis().scale(y).orient("left");
    const svg     = d3.select(React.findDOMNode(this.refs.plot)).append("svg");
    const plot    = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    const xAxisEl = plot.append("g").attr("class", "x axis");
    const yAxisEl = plot.append("g").attr("class", "y axis");

    window.addEventListener('resize', this.handleResize.bind(this));

    this.setState({
      svg    : svg,
      plot   : plot,
      xAxis  : xAxis,
      yAxis  : yAxis,
      xAxisEl: xAxisEl,
      yAxisEl: yAxisEl,
      x      : x,
      y      : y
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  handleResize = this._debounce(() => {
    const {margin} = this.props.config;
    const width  = React.findDOMNode(this.refs.plot).offsetWidth - margin.left - margin.right;
    const height = React.findDOMNode(this.refs.plot).offsetHeight - margin.top - margin.bottom;
    this.refreshPlot(width, height);
  }, 150);


  render() {
    return (
      <div style={{height: '100%'}} ref="plot"/>
    )
  }

  refreshPlot(width, height) {
    const {margin, axes} = this.props.config;
    const {svg, plot, xAxisEl, yAxisEl, xAxis, yAxis, x, y} = this.state;

    svg.attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    plot.attr("width", width)
      .attr("height", height);

    x.range([0, width]);
    y.range([height, 0]);

    x.domain([axes.x.min, axes.x.max]);
    y.domain([axes.y.min, axes.y.max]);

    axes.x.show && xAxisEl.attr("transform", "translate(0," + height + ")").call(xAxis);
    axes.y.show && yAxisEl.call(yAxis);

    this.renderSeries();
  }

  renderSeries() {
    const {series} = this.props.config;
    const {plot, x, y} = this.state;

    const points = plot.selectAll(".dot").data(series[0].data);

    points.enter().append("circle").attr("class", "dot");

    points
      .attr("r", 3.5)
      .attr("cx", function (d) {
        return x(series[0].xAccessor(d));
      })
      .attr("cy", function (d) {
        return y(series[0].yAccessor(d));
      })
      .style("fill", function (d) {
        return "rgba(0,0,0,0.5)"
      });

    points.exit().transition().duration(500).style("opacity", 0).remove();
  }

  _debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this, args = arguments;
      var later   = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout     = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
}

export default ResponsiveD3;