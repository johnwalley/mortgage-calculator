import React from 'react';
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

export const Axis = ({ orient, scale, height }) => {
  const tickArguments = [],
    tickValues = null,
    tickFormat = null,
    tickSizeInner = 6,
    tickSizeOuter = 6,
    tickPadding = 3;

  const spacing = Math.max(tickSizeInner, 0) + tickPadding;
  const transform = orient === top || orient === bottom ? translateX : translateY;
  const range = scale.range();
  const range0 = range[0] + 0.5;
  const range1 = range[range.length - 1] + 0.5;
  const position = (scale.bandwidth ? center : identity)(scale.copy());
  const k = orient === top || orient === left ? -1 : 1;

  const ticks = scale.ticks(5).map((t, i) => (
    <g className="tick" key={i} opacity="1" transform={transform(position, position, t)}>
      <line
        stroke="#000"
        y1={orient === left || orient === right ? 0.5 : 0}
        y2={orient === left || orient === right ? 0.5 : k * tickSizeInner}
        x1={orient === left || orient === right ? 0 : 0.5}
        x2={orient === left || orient === right ? k * tickSizeInner : 0.5}
        >
      </line>
      <text
        fill="#000"
        y={orient === left || orient === right ? 0.5 : k * spacing}
        x={orient === left || orient === right ? k * spacing : 0.5}
        dy={orient === top ? "0em" : orient === bottom ? "0.71em" : "0.32em"}
        >
        {t}
      </text>
    </g>
  )
  );

  return (
    <g
      fill="none"
      fontSize="10"
      fontFamily="sans-serif"
      textAnchor={orient === right ? "start" : orient === left ? "end" : "middle"}
      transform={(orient === top || orient === bottom) && (height !== undefined) ? "translate(0," + height + ")" : "translate(0,0)"}
      >
      <path className="domain" stroke="#000" d={orient === left || orient == right
        ? "M" + k * tickSizeOuter + "," + range0 + "H0.5V" + range1 + "H" + k * tickSizeOuter
        : "M" + range0 + "," + k * tickSizeOuter + "V0.5H" + range1 + "V" + k * tickSizeOuter}></path>
      {ticks}
    </g>
  );
};

export default Axis;