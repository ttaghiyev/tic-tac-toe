import React from 'react';
import PropTypes from 'prop-types';

import Digits from './Digits';
import Triangle from './Triangle';

const Controls = ({ turn, round }) => (
  <section className="controls">
    <div className="control-sect control-sect-lt">
      <button>reset</button>
    </div>
    <div className="game-info">
      <Triangle
        className="info-bg info-bg-lt"
        width={16}
        height={48}
        orient={['top', 'left']}
      />

      <p className="game-info-counter game-info-round">
        Round: <Digits className="round-digits" val={round} />
      </p>

      <p className="game-info-counter game-info-turn">
        Turn: <Digits className="turn-digits" val={turn} />
      </p>

      <Triangle
        className="info-bg info-bg-rt"
        width={16}
        height={48}
        orient={['top', 'right']}
      />
    </div>
    <div className="control-sect control-sect-rt">
      <button>concede</button>
    </div>
  </section>
);

Controls.propTypes = {
  turn: PropTypes.number.isRequired,
  round: PropTypes.number.isRequired
};

export default Controls;
