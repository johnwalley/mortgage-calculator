import React from 'react';
import * as d3 from 'd3';

import { Axis, bottom, top, left, right } from './Axis';

const Chart = ({ monthly, repayments, width, height }) => {
  const margin = { top: 40, right: 40, bottom: 40, left: 40 };
  width = width - margin.left - margin.right;
  height = height - margin.top - margin.bottom;

  const x = d3.scaleLinear()
    .domain(d3.extent(repayments.map(r => r.month)))
    .range([0, width]);

  const y = d3.scaleLinear()
    .domain([0, monthly])
    .range([height, 0]);

  const stack = d3.stack();

  const area = d3.area()
    .x(function (d, i) { return x(d.data.month); })
    .y0(function (d) { return y(d[0]); })
    .y1(function (d) { return y(d[1]); });

  stack.keys(["interest", "capital"]);

  const s = [area(stack(repayments)[0]), area(stack(repayments)[1])];

  return (
    <svg
      width="100%"
      height="300px"
      viewBox={"0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom)}
      preserveAspectRatio="xMinYMin"
      >
      <g transform={"translate(" + margin.left + "," + margin.top + ")"}>
        <path d={s[1]} fill="#1abc9c" stroke="black" />
        <path d={s[0]} fill="#3498db" stroke="black" />
        <Axis orient={bottom} scale={x} height={height} />
        <Axis orient={left} scale={y} />
      </g>
    </svg>
  );
};

export default Chart;