import React from 'react';
import PropTypes from 'prop-types';
import Digits from './Digits';
import Triangle from './Triangle';
import PlayerName from '../containers/PlayerName';

/** Combined player names / scores component */
const Players = ({ p1wins = 0, p2wins = 0, updatePlayerName }) => (
  <section className="players">
    <div className="player-bars">
      <div className="bar lt" />
      <div className="bar rt" />
    </div>

    <div className="scores-box">
      <ul className="scores">
        <li className="score lt">
          <Triangle
            className="score-bg"
            width={12}
            height={48}
            orient={['bottom', 'left']}
          />
          <Digits className="score-val" val={p1wins} />
        </li>
        <li className="score rt">
          <Triangle
            className="score-bg"
            width={12}
            height={48}
            orient={['bottom', 'right']}
          />
          <Digits className="score-val" val={p2wins} />
        </li>
      </ul>
    </div>

    <ul className="player-names">
      <li className="player-name lt">
        <Triangle
          className="name-bg"
          width={20}
          height={42}
          orient={['bottom', 'left']}
        />
        <div className="name-text">
          <PlayerName
            playerId="0"
            placeholder="PLAYER ONE"
            handleInputFocusOut={updatePlayerName}
          />
        </div>
      </li>
      <li className="player-name rt">
        <Triangle
          className="name-bg"
          width={20}
          height={42}
          orient={['bottom', 'right']}
        />
        <div className="name-text">
          <PlayerName
            playerId="1"
            placeholder="PLAYER TWO"
            handleInputFocusOut={updatePlayerName}
          />
        </div>
      </li>
    </ul>
  </section>
);

Players.propTypes = {
  p1wins: PropTypes.number.isRequired,
  p2wins: PropTypes.number.isRequired,
  updatePlayerName: PropTypes.func.isRequired
};

export default Players;
