import React, { PropTypes, Component } from 'react';
import d3 from 'd3';

class NumericDistribution extends Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return (
      <div ref="plot" style={{height: '100%'}}>
      </div>
    );
  }

  componentDidUpdate() {
    const {margin} = this.props.config;
    const width  = React.findDOMNode(this.refs.plot).offsetWidth - margin.left - margin.right;
    const height = React.findDOMNode(this.refs.plot).offsetHeight - margin.top - margin.bottom;
    this.refreshPlot(width, height);
  }

  componentDidMount() {
    const {margin} = this.props.config;
    const width    = React.findDOMNode(this.refs.plot).offsetWidth - margin.left - margin.right;
    const height   = React.findDOMNode(this.refs.plot).offsetHeight - margin.top - margin.bottom;
    const x        = d3.scale.linear().range([0, width]);
    const y        = d3.scale.linear().range([height, 0]);
    const xAxis    = d3.svg.axis().scale(x).orient("bottom");
    const yAxis    = d3.svg.axis().scale(y).orient("left");
    const svg      = d3.select(React.findDOMNode(this.refs.plot)).append("svg");
    const plot     = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    const xAxisEl  = plot.append("g").attr("class", "x axis");
    const yAxisEl  = plot.append("g").attr("class", "y axis");
    const brush    = d3.svg.brush().x(x).on("brush", this.handleBrush.bind(this));
    const brushSvg = svg.append("g")
      .attr("class", "brush")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .append("g").attr("class", "x brush");


    window.addEventListener('resize', this.handleResize.bind(this));

    this.setState({
      svg     : svg,
      plot    : plot,
      brushSvg: brushSvg,
      brush   : brush,
      xAxis   : xAxis,
      yAxis   : yAxis,
      xAxisEl : xAxisEl,
      yAxisEl : yAxisEl,
      x       : x,
      y       : y
    })
  }

  refreshPlot(width, height) {
    const {margin, axes} = this.props.config;
    const {svg, plot, brush, brushSvg, xAxisEl, yAxisEl, xAxis, yAxis, x, y} = this.state;

    svg.attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    plot.attr("width", width)
      .attr("height", height);

    x.range([0, width]);
    y.range([height, 0]);

    x.domain([axes.x.min, axes.x.max]);
    y.domain([axes.y.min, axes.y.max]);

    brushSvg
      .call(brush)
      .selectAll("rect")
      .attr("y", 0)
      .attr("height", height)

    axes.x.show && xAxisEl.attr("transform", "translate(0," + height + ")").call(xAxis)
      .selectAll("text")
      .attr("class", "label")
      .attr("x", 0)
      .attr("y", 10)
      .style("text-anchor", function (d, i) {
        return (i == 0) ? "start" : (i == xAxis.ticks()[0]) ? "end" : "middle";
      });
    axes.y.show && yAxisEl.call(yAxis);
    this.renderSeries(width, height);
  }

  renderSeries(width, height) {
    const {plot, x, y} = this.state;
    const {series} = this.props.config;

    const bars = plot.selectAll(".bar").data(series.data);

    bars.enter()
      .append("g")
      .attr("class", "bar")
      .append("rect");

    const barWidth = width / series.data.length - 1;
    bars.selectAll("rect")
      .attr("transform", function (d) {
        return "translate(" + x(series.xAccessor(d)) + "," + y(series.yAccessor(d)) + ")";
      })
      .attr("x", 1)
      .attr("width", Math.floor(barWidth))
      .attr("height", d => height - y(series.yAccessor(d)));

    bars.exit()
      .remove();
  }

  handleBrush() {
    const {brush} = this.state;
    const {dimension, onBrush} = this.props;
    onBrush({
      dimension: dimension,
      values   : brush.extent(),
      clear    : brush.empty()
    });
  }

  handleResize = this._debounce(() => {
    const {margin} = this.props.config;
    const width  = React.findDOMNode(this.refs.plot).offsetWidth - margin.left - margin.right;
    const height = React.findDOMNode(this.refs.plot).offsetHeight - margin.top - margin.bottom;
    this.refreshPlot(width, height);
  }, 150);

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

export default NumericDistribution
