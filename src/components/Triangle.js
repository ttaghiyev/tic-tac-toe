import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

/** Creates triangle point coordinates for an SVG shape */
export const generatePoints = (w, h, o) => {
  let points = '';
  if (o[0] === 'top') {
    points =
      o[1] === 'right' ? `0,0 ${w},${h} 0,${h}` : `${w},0 ${w},${h} 0,${h}`;
  } else {
    points = o[1] === 'right' ? `0,0 ${w},0 0,${h}` : `0,0 ${w},0 ${w},${h}`;
  }
  return points;
};

/**
 * SVG triangle shape
 * Orientation in the form of:
 * [0] - point of longest side
 * [1] - point of non right edge
 */
const Triangle = ({
  className = '',
  width,
  height,
  orient = ['top', 'right']
}) => (
  <svg className={cn('triangle', className)} width={width} height={height}>
    <polygon points={generatePoints(width, height, orient)} />
  </svg>
);

export default Triangle;

Triangle.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  orient: PropTypes.arrayOf(PropTypes.string)
};
