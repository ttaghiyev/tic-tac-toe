import React, { Component } from 'react';
import Grid from './Grid';
import Players from '../components/Players';
import Controls from '../components/Controls';
import Message from '../components/Message';

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
      ...this.getDefaultBoardState(),
      notification: ''
    };

    this.playerNames = ['Player One', 'Player Two'];
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

  getNewRoundState = () => ({
    ...this.getDefaultBoardState(),
    round: this.state.round + 1
  });

  // track

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

    // @TODO swap this to batched setState calls
    let nextState = {
      ...this.state,
      cells: Object.assign([...this.state.cells], { [cellId]: currPlayer }),
      turn: this.state.turn + 1,
      notification: ''
    };

    nextState.winSet = this.getWinningCells(
      this.getPlayerCells(nextState.cells, currPlayer),
      this.winConditions
    );

    if (nextState.winSet.length === 3) {
      nextState.wins[currPlayer] += 1;
      nextState.lockBoard = true;
      nextState.notification = 'Point for ' + this.playerNames[currPlayer];
    }

    this.setState(nextState);
  };

  /**
   * Sets app state message to be displayed by Message component
   *
   * If the second arg 'delegate' is set to true, state will not be set
   * but instead just the new message object is returned. This is to help facilitate
   * single setState instances
   */
  notify = (message, delegate = false) => {
    const newNotification = { notification: message };

    return delegate ? newNotification : this.setState(newNotification);
  };

  /** Reset turn, game board, player markers, and icrement round by 1 */
  resetRound = () => {
    this.setState({
      ...this.getNewRoundState(),
      ...this.notify('', true)
    });
  };

  /** Reset game in its entirety, including wins (non round property) */
  resetGame = () => {
    this.setState({
      ...this.getDefaultGameState(),
      ...this.getDefaultBoardState(),
      ...this.notify('reset the game', true)
    });
  };

  /**
   * Surrenders the round to opposing player and starts a new round.
   * State set is the same as resetRound but with a win increment
   * for the opponent
   */
  concede = () => {
    const currPlayer = this.getCurrentPlayer(this.state.turn);
    const opponent = currPlayer === 0 ? 1 : 0;

    this.setState({
      ...this.getNewRoundState(),
      ...this.notify('Point for ' + this.playerNames[opponent]),
      wins: this.state.wins.map((w, i) => (i === opponent ? w + 1 : w))
    });
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

  /** Sets a static name variable to use for display purposes */
  updatePlayerName = (id, str) => {
    this.playerNames[parseInt(id)] = str;
  };

  render() {
    return (
      <div className="zone-content">
        <header className="zone-header">
          <Players
            p1wins={this.state.wins[0]}
            p2wins={this.state.wins[1]}
            updatePlayerName={this.updatePlayerName}
          />
          <Message
            text={this.state.notification}
            notifyCallback={this.notify}
          />
        </header>
        <main className="zone-grid">
          {this.state.message && <p>{this.state.message}</p>}
          <Grid
            {...this.state}
            player={this.getCurrentPlayer(this.state.turn)}
            onCellClick={this.takeTurn}
            handleReset={this.resetRound}
            handleNotify={this.notify}
          />
        </main>
        <footer className="zone-footer">
          <Controls
            turn={this.state.turn}
            round={this.state.round}
            handleResetClick={this.resetGame}
            handleConcedeClick={this.concede}
          />
        </footer>
      </div>
    );
  }
}

export default App;
