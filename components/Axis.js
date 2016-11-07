import React from 'react';
import { axisBottom } from '../axis';
import * as d3 from 'd3';

function translateX(scale0, scale1, d) {
  var x = scale0(d);
  return "translate(" + (isFinite(x) ? x : scale1(d)) + ",0)";
}

function translateY(scale0, scale1, d) {
  var y = scale0(d);
  return "translate(0," + (isFinite(y) ? y : scale1(d)) + ")";
}

function center(scale) {
  var offset = scale.bandwidth() / 2;
  if (scale.round()) offset = Math.round(offset);
  return function (d) {
    return scale(d) + offset;
  };
}

function identity(x) {
  return x;
}

export const top = 1;
export const right = 2;
export const bottom = 3;
export const left = 4;

const epsilon = 1e-6;

const Axis = ({ orient, scale }) => {
  const tickArguments = [],
    tickValues = null,
    tickFormat = null,
    tickSizeInner = 6,
    tickSizeOuter = 6,
    tickPadding = 3;

  const transform = orient === top || orient === bottom ? translateX : translateY;

  const range = scale.range();
  const range0 = range[0] + 0.5;
  const range1 = range[range.length - 1] + 0.5;
  const position = (scale.bandwidth ? center : identity)(scale.copy());
  const k = orient === top || orient === left ? -1 : 1;

  const ticks = scale.ticks(5).map((t, i) => (
    <g className="tick" key={i} opacity="1" transform={transform(position, position, t)}>
      <line stroke="#000" y2="6" x1="0.5" x2="0.5"></line>
      <text fill="#000" y="9" x="0.5" dy="0.71em">{t}</text>
    </g>
  )
  );

  return (
    <g fill="none" fontSize="10" fontFamily="sans-serif" textAnchor="middle">
      <path className="domain" stroke="#000" d={"M" + range0 + "," + k * tickSizeOuter + "V0.5H" + range1 + "V" + k * tickSizeOuter}></path>
      {ticks}
    </g>
  );
};

export default Axis;