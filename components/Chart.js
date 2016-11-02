import React from 'react';
import * as d3 from 'd3';

import Axis from './Axis';

const Chart = ({ monthly, repayments, width, height }) => {
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
    <svg width={width} height={height}>
      <path d={s[1]} fill="#1abc9c" stroke="black" />
      <path d={s[0]} fill="#3498db" stroke="black" />
      <Axis scale={x}/>
    </svg>
  );
};

export default Chart;