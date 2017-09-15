import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Cell = ({ id, handleOnClick, highlighted = [], owned = null }) => {
  // @TODO cleanup
  return (
    <li
      className={cn('cell', { 'cell-marked': highlighted.includes(id) })}
      id={id}
      onClick={handleOnClick}
    >
      {id}: {getCellMarker(owned)}
    </li>
  );
};

Cell.propTypes = {
  id: PropTypes.number.isRequired,
  handleOnClick: PropTypes.func.isRequired,
  highlighted: PropTypes.array,
  owned: PropTypes.number
};

export default Cell;

export const getCellMarker = int =>
  int !== null ? (int === 0 ? 'x' : 'o') : int;
