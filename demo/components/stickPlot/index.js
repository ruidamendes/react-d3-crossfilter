import React, { PropTypes, Component } from 'react';
import d3 from 'd3';

class StickPlot extends Component {
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
      brush : null
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

    const xScale      = d3.scale.linear().range([0, width]).domain([0, 100]);
    const yScale      = d3.scale.linear().range([height, 0]).domain([0, 1]);

    const xAxis       = d3.svg.axis().scale(xScale).orient("bottom");
    const yAxis       = d3.svg.axis().scale(yScale).orient("left");
    const brush       = d3.svg.brush().x(xScale).on("brush", this.handleBrush);

    const svg         = d3.select(React.findDOMNode(this.refs.plot)).append("svg")
      .attr("width", width + brushMargin.left + brushMargin.right)
      .attr("height", height + brushMargin.top + brushMargin.bottom)
      .append("g")
      .attr("transform", "translate(" + brushMargin.left + "," + brushMargin.top + ")");

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

    this.setState({
      svg   : svg,
      height: height,
      width : width,
      xScale: xScale,
      yScale: yScale,
      xAxis : xAxis,
      yAxis : yAxis,
      brush : brush
    })
  }

  renderPlot() {
    const {svg, xScale, yScale, height, brush, xAxis} = this.state;
    const markers = svg.selectAll(".line").data(this.props.data);
    xScale.domain([0, d3.max(this.props.data)]);
    svg.select('.x.axis').call(xAxis);

    markers.enter()
      .append("line")
      .attr("class", "line");

    markers
      .attr("x1", function (d) {
        return xScale(d);
      })
      .attr("x2", function (d) {
        return xScale(d);
      })
      .attr("y1", function (d) {
        return yScale(0);
      })
      .attr("y2", function (d) {
        return yScale(1);
      });

    markers.exit()
      .remove();

    svg.append("g")
      .attr("class", "x brush")
      .call(brush)
      .selectAll("rect")
      .attr("y", 0)
      .attr("height", height);
  }

  handleBrush() {

  }

}

export default StickPlot
