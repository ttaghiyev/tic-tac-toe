import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { TimelineLite } from 'gsap';

import Cell from './Cell';

export default class Grid extends Component {
  constructor() {
    super();
  }

  componentDidUpdate() {
    // did we win?
    if (this.props.winSet.length === 3) {
      return this.animateWinCells(
        document.getElementsByClassName('cell-highlight')
      );
    }

    if (this.props.turn > 9) {
      this.props.handleNotify('Draw');
      this.props.handleReset();
      return true;
    }

    return true;
  }

  animateWinCells = HTMLcol => {
    const winAnim = new TimelineLite();
    const winStyles = {
      backgroundColor: 'rgba(71, 229, 188, .2)',
      borderColor: '#73C7B1',
      clearProps: 'all'
    };

    Array.from(HTMLcol)
      .reduce((acc, el) => {
        acc.to(el, 1.4, winStyles, 0);
        return acc;
      }, winAnim)
      .eventCallback('onComplete', () => {
        this.props.handleReset();
      });

    winAnim.play();
  };

  render() {
    const { cells, winSet, onCellClick, player } = this.props;
    return (
      <ul className={cn('grid', `player--${player}`)}>
        {cells.map((c, i) => (
          <div key={i} className="cell-zone">
            <Cell
              key={i}
              id={i}
              owner={c}
              highlighted={winSet}
              currentPlayer={player}
              handleOnClick={onCellClick}
            />
          </div>
        ))}
      </ul>
    );
  }
}

Grid.propTypes = {
  cells: PropTypes.array.isRequired,
  winSet: PropTypes.array.isRequired,
  onCellClick: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleNotify: PropTypes.func.isRequired,
  turn: PropTypes.number.isRequired,
  player: PropTypes.oneOf([0, 1])
};
