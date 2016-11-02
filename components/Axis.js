import React from 'react';

const Axis = ({ scale }) => {
  const top = 1,
    right = 2,
    bottom = 3,
    left = 4,
    epsilon = 1e-6;

  const orient = 3;

  const tickArguments = [],
    tickValues = null,
    tickFormat = null,
    tickSizeInner = 6,
    tickSizeOuter = 6,
    tickPadding = 3;

  const range = scale.range();
  const range0 = range[0] + 0.5;
  const range1 = range[range.length - 1] + 0.5;
  const k = orient === top || orient === left ? -1 : 1;

  const ticks = scale.ticks(5).map(t => (
    <text key={t} dy="100">
      {t}
    </text>
    )
  );

  return (
    <g>
      <path d={"M" + range0 + "," + k * tickSizeOuter + "V0.5H" + range1 + "V" + k * tickSizeOuter} stroke="black" fill="none" />

      {ticks}
    </g>
  );
};

export default Axis;