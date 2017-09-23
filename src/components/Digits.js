import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

/**
 * Displays digits in the format:
 * If single digit: (0)1
 * If double: normal
 *
 * Used for counters like Turn / Wins
 */
export const Digits = ({ className = '', val }) => {
  const trueNum = parseInt(val);

  const content =
    trueNum > 9 && trueNum < 100 ? (
      <span className="digit">{trueNum}</span>
    ) : (
      <span className="digit">
        <i className="digit-mute">0</i>
        {trueNum === 0 ? <i className="digit-mute">0</i> : trueNum}
      </span>
    );

  return (
    <div className={cn('digits', 'digit-counter', className)}>{content}</div>
  );
};

Digits.propTypes = {
  className: PropTypes.string,
  val: PropTypes.number.isRequired
};

export default Digits;
