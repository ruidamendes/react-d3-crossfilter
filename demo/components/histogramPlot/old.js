import React, { PropTypes, Component } from 'react';
import d3 from 'd3';

class HistogramPlot extends Component {
  constructor() {
    super();
    this.state = {
      svg     : null,
      brushSvg: null,
      xAxis   : null,
      yAxis   : null,
      xScale  : null,
      yScale  : null,
      height  : null,
      width   : null,
      brush   : null
    }
  }

  render() {
    return (
      <div ref="plot">
      </div>
    );
  }

  componentWillMount() {

  }

  componentDidUpdate() {
    this.renderPlot();
  }

  componentDidMount() {
    this.createChartComponents();
  }

  createChartComponents() {
    const brushMargin = this.props.margin;
    const width       = this.props.width - brushMargin.left - brushMargin.right;
    const height      = this.props.height - brushMargin.top - brushMargin.bottom;
    const xScale      = d3.scale.linear().range([0, width]);
    const yScale      = d3.scale.linear().range([height, 0]);
    const xAxis       = d3.svg.axis().scale(xScale).orient("bottom");
    const yAxis       = d3.svg.axis().scale(yScale).orient("left").ticks(5);
    const brush       = d3.svg.brush().x(xScale).on("brush", this.handleBrush.bind(this));

    let canvas = d3.select(React.findDOMNode(this.refs.plot)).append("svg")
      .attr("width", width + brushMargin.left + brushMargin.right)
      .attr("height", height + brushMargin.top + brushMargin.bottom);

    const svg = canvas.append("g")
      .attr("class", "plot")
      .attr("transform", "translate(" + brushMargin.left + "," + brushMargin.top + ")");

    const brushSvg = canvas.append("g")
      .attr("class", "brush")
      .attr("transform", "translate(" + brushMargin.left + "," + brushMargin.top + ")");

    //svg.append("g")
    //  .attr("class", "y axis")
    //  .call(yAxis);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .attr("class", "label")
      .attr("x", 0)
      .attr("y", 10)
      .style("text-anchor", function (d, i) {
        return (i == 0) ? "start" : (i == xAxis.ticks()[0]) ? "end" : "middle";
      });

    brushSvg.append("g")
      .attr("class", "x brush")
      .call(brush)
      .selectAll("rect")
      .attr("y", 0)
      .attr("height", height);

    this.setState({
      svg     : svg,
      brushSvg: brushSvg,
      height  : height,
      width   : width,
      xScale  : xScale,
      yScale  : yScale,
      yAxis   : yAxis,
      xAxis   : xAxis,
      brush   : brush
    })
  }

  renderPlot() {
    const {svg, xScale, yScale, height, yAxis, xAxis} = this.state;
    const {group} = this.props;

    const data = group.all();
    xScale.domain([0, d3.max(data.map(d => d.key))]).nice();
    yScale.domain([0, group.top(1)[0].value]);

    //svg.select('.y.axis').call(yAxis);
    svg.select('.x.axis').call(xAxis);

    const bars = svg.selectAll(".bar").data(data);

    bars.enter()
      .append("g")
      .attr("class", "bar")
      .append("rect");

    bars.selectAll("rect")
      .attr("transform", function (d) {
        return "translate(" + xScale(d.key) + "," + yScale(d.value) + ")";
      })
      .attr("x", 1)
      .attr("width", xScale(9))
      .attr("height", d => height - yScale(d.value));

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

}

export default HistogramPlot
