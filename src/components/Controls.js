import React from 'react';
import PropTypes from 'prop-types';

import Digits from './Digits';
import Triangle from './Triangle';

const Controls = ({ turn, round, handleResetClick }) => (
  <section className="controls">
    <div className="control-sect control-sect-lt">
      <button onClick={handleResetClick}>reset</button>
      <Triangle
        className="info-btn-bg info-btn-bg-lt"
        width={20}
        height={42}
        orient={['top', 'left']}
      />
    </div>
    <div className="control-sect control-sect-rt">
      <button>concede</button>
      <Triangle
        className="info-btn-bg info-btn-bg-rt"
        width={20}
        height={42}
        orient={['top', 'right']}
      />
    </div>
    <div className="game-info">
      <Triangle
        className="info-bg info-bg-lt"
        width={14}
        height={48}
        orient={['top', 'left']}
      />
      <Triangle
        className="info-bg info-bg-rt"
        width={14}
        height={48}
        orient={['top', 'right']}
      />

      <div className="game-info-counter game-info-turn">
        TRN <Digits className="turn-digits" val={turn} />
      </div>

      <div className="game-info-counter game-info-round">
        RND <Digits className="round-digits" val={round} />
      </div>
    </div>
  </section>
);

Controls.propTypes = {
  turn: PropTypes.number.isRequired,
  round: PropTypes.number.isRequired,
  handleResetClick: PropTypes.func.isRequired
};

export default Controls;
