import React, { PropTypes, Component } from 'react';
import d3 from 'd3';

class OrdinalDistribution extends Component {
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
    const width   = React.findDOMNode(this.refs.plot).offsetWidth - margin.left - margin.right;
    const height  = React.findDOMNode(this.refs.plot).offsetHeight - margin.top - margin.bottom;
    const x       = d3.scale.linear().range([0, width]);
    const y       = d3.scale.ordinal().rangeRoundBands([0, height], 0.1);
    const xAxis   = d3.svg.axis().scale(x).orient("top").tickSize(5);
    const yAxis   = d3.svg.axis().scale(y).orient("left").tickSize(5);
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

  refreshPlot(width, height) {
    const {margin, axes} = this.props.config;
    const {svg, plot, xAxisEl, yAxisEl, xAxis, yAxis, x, y} = this.state;

    svg.attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    plot.attr("width", width)
      .attr("height", height);

    x.range([0, width]);
    y.range([height, 0]).rangeRoundBands([0, height], 0.1);

    x.domain([axes.x.min, axes.x.max]);
    y.domain(axes.y.domain);

    axes.x.show && xAxisEl.call(xAxis);
    axes.y.show && yAxisEl.call(yAxis);
    this.renderSeries(width, height);
  }

  renderSeries(width, height) {
    const {plot, x, y} = this.state;
    const {currentFilter} = this.props;
    const {series} = this.props.config;

    const bars = plot.selectAll(".bar").data(series.data);

    bars.enter()
      .append("g")
      .attr("class", "bar")
      .attr("transform", function (d) {
        return "translate(0," + y(d.key) + ")";
      })
      .append("rect");

    bars.selectAll("rect")
      .attr("width", function (d) {
        return x(series.xAccessor(d));
      })
      .attr("height", y.rangeBand())
      .style("fill", d => {
        const isFilter = currentFilter.indexOf(d.key) >= 0;
        return isFilter ? "orange" : "steelblue"
        return 'steelblue';
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
      ordinal  : true
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

export default OrdinalDistribution
