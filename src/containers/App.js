import React, { Component } from 'react';
import Grid from './Grid';
import Players from '../components/Players';
import Controls from '../components/Controls';

import '../static/index';

/**
 * Top level state manager and logic container.
 * Responsible for all state management and tracking
 */
class App extends Component {
  constructor() {
    super();

    this.winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    this.state = {
      ...this.getDefaultGameState(),
      ...this.getDefaultBoardState()
    };
  }

  /** Returns default gamewide state keys */
  getDefaultGameState = () => ({
    round: 1,
    wins: [0, 0]
  });

  /** Returns round specific (but not all) state keys */
  getDefaultBoardState = () => ({
    turn: 1,
    cells: Array(9).fill(null),
    winSet: [],
    lockBoard: false,
    message: null
  });

  /**
   * Given a ref to the last cell clicked:
   * 1. Update new taken cell list
   * 2. Check if current player + new cell has won. If yes, lock the board to prep
   * it for animations,
   * 3. Set the new state + win conditions / flags. Grid component handles checking
   * for a win/draw, animating the UI, and running a callback to set up the next round.
   */
  takeTurn = e => {
    const cellId = parseInt(e.target.getAttribute('id'));
    const currPlayer = this.getCurrentPlayer(this.state.turn);

    if (this.state.cells[cellId] !== null || this.state.lockBoard) {
      return false;
    }

    let nextState = {
      ...this.state,
      cells: Object.assign([...this.state.cells], { [cellId]: currPlayer }),
      turn: this.state.turn + 1
    };

    nextState.winSet = this.getWinningCells(
      this.getPlayerCells(nextState.cells, currPlayer),
      this.winConditions
    );

    if (nextState.winSet.length === 3) {
      nextState.wins[currPlayer] += 1;
      nextState.lockBoard = true;
    }

    this.setState(nextState);
  };

  /** Reset turn, game board, player markers, and icrement round by 1 */
  resetRound = () => {
    this.setState({
      ...this.getDefaultBoardState(),
      round: this.state.round + 1
    });
  };

  /** Reset game in its entirety, including wins (non round property) */
  resetGame = () => {
    // @TODO logic
    return true;
  };

  /** Array of cells the current player has 'marked' */
  getPlayerCells = (arr, pid) => {
    return arr.reduce((result, val, i) => {
      if (val === pid) {
        result.push(i);
      }
      return result;
    }, []);
  };

  /** Array of cell indexes that represent the winning 3, i.e. [3, 5, 7] */
  getWinningCells = (ownedCells, conditions) => {
    return conditions.find(set => set.every(i => ownedCells.includes(i))) || [];
  };

  /**
   * Player id is based on turn, odds are P1, evens P2, but player ID is also
   * used as array access indecies for things like wins, and to avoid having to - 1
   * all the time, P1 -> 0 and P2 -> 1 for the sake of convenience.
   */
  getCurrentPlayer = turnNum => (parseInt(turnNum) % 2 == 0 ? 1 : 0);

  render() {
    // @TODO cleanup
    return (
      <div className="zone-content">
        <header className="zone-header">
          <Players p1wins={this.state.wins[0]} p2wins={this.state.wins[1]} />
        </header>
        <main className="zone-grid">
          {this.state.message && <p>{this.state.message}</p>}
          <Grid
            {...this.state}
            onCellClick={this.takeTurn}
            handleReset={this.resetRound}
          />
        </main>
        <footer className="zone-footer">
          <Controls turn={this.state.turn} round={this.state.round} />
        </footer>
      </div>
    );
  }
}

export default App;
