import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TweenLite, TimelineLite } from 'gsap';

import Cell from '../components/Cell';

export default class Grid extends Component {
  constructor() {
    super();
  }

  componentDidUpdate() {
    // did we win?
    if (this.props.winSet.length === 3) {
      return this.animateWinCells(
        document.getElementsByClassName('cell-marked')
      );
    }

    if (this.props.turn > 9) {
      return this.props.handleReset();
    }

    return true;
  }

  animateDraw = () => {
    console.log('draw');
  };

  animateWinCells = HTMLcol => {
    const winAnim = new TimelineLite();
    const winStyles = {
      backgroundColor: 'rgba(158, 228, 147, .3)',
      borderColor: 'rgb(158, 228, 147)',
      clearProps: 'all'
    };

    Array.from(HTMLcol)
      .reduce((acc, el) => {
        acc.to(el, 1, winStyles, 0);
        return acc;
      }, winAnim)
      .eventCallback('onComplete', () => this.props.handleReset());

    winAnim.play();
  };

  render() {
    const { cells, winSet, onCellClick } = this.props;
    return (
      <ul className="grid">
        {cells.map((c, i) => (
          <Cell
            key={i}
            id={i}
            owned={c}
            highlighted={winSet}
            handleOnClick={onCellClick}
          />
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
  turn: PropTypes.number.isRequired
};
