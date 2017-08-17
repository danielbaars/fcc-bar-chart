import React, { Component } from 'react';
import { scaleLinear, scaleTime } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';
import { transition } from 'd3-transition';

export default class BarChart extends Component {
  constructor(props){
    super(props)
    this.createBarChart = this.createBarChart.bind(this)
  }
  componentDidMount() {
    this.createBarChart()
  }
  componentDidUpdate() {
    this.createBarChart()
  }
  createBarChart() {

    var cNum = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    });

    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    let margin = { top: 3, right: 5, bottom: 20, left: 40 };

    const w = this.props.size[0] - margin.left - margin.right;
    const h = this.props.size[1] - margin.top - margin.bottom;

    const data = this.props.data;

    const firstDate = this.props.data[0][0];
    const lastDate = this.props.data[data.length - 1][0];

    const years = new Date(lastDate).getFullYear() - new Date(firstDate).getFullYear();

    const barWidth = w / data.length;

    const node = this.node;

    const yScale = scaleLinear()
      .domain([0, max(data, d => d[1])])
      .range([0, h]);

    const yAxisValues = scaleLinear()
      .domain([0, max(data, d => d[1])])
      .range([h, 0]);

    const yAxisTicks = axisLeft(yAxisValues)
      .ticks(10);

    const xAxisValues = scaleTime()
      .domain([new Date(firstDate), new Date(lastDate)])
      .range([0, w]);

    const xAxisTicks = axisBottom(xAxisValues)
      .ticks(years / 5);

    select(node)
    .append("g")
    .attr("id", "chart")
    .attr('transform', `translate(${margin.left}, 0)`)
      .selectAll("rect")
        .data(data)
        .enter()
          .append("rect")
          .style('fill', 'blue')
          .attr('id', d => 'b_' + yScale(d[1]))
          .attr("width", barWidth)
          .attr("height", d => yScale(d[1]))
          .attr("x", (d, i) => i * barWidth)
          .attr("y", d => h + margin.top - yScale(d[1]))
          .on('mouseover', d => {
            select(event.srcElement)
              .style('fill', 'orange');
            tooltip.transition().duration(200)
              .style('opacity', 0.9);
            let month = new Date(d[0]).getMonth();
            let monthName = monthNames[month];
            let year = new Date(d[0]).getFullYear();
            tooltip.html(`<strong>${cNum.format(d[1])} Billion</strong> <span>(${monthName + ' ' + year})</span>`)
              .style('left', (event.pageX - 35 + 'px'))
              .style('top', (event.pageY - 30 + 'px'))
              .style('font-size', '12px');
          })
          .on('mouseout', d => {
            select(event.srcElement)
              .style('fill', 'blue');
            tooltip.transition().duration(200)
              .style('opacity', 0);
          });

    const yGuide = select("svg").append("g")
      .attr('id', 'yguide')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(yAxisTicks);

    const xGuide = select("svg").append("g")
      .attr('id', 'xguide')
      .attr('transform', `translate(${margin.left}, ${h + margin.top})`)
      .call(xAxisTicks);

    const tooltip = select('body').append('div')
      .style('position', 'absolute')
      .style('padding', '0 10px')
      .style('background', 'white')
      .style('opacity', 0);


  }
  render() {
    return (
      <svg ref={node => this.node = node} width={this.props.size[0]} height={this.props.size[1]} />
    );
   }
}
