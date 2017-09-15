import React from 'react';
import expect from 'expect.js';
import { shallow } from 'enzyme';

import App from './App';

describe('<App />', function() {
  describe('getCurrentPlayer', function() {
    const getCurrentPlayer = shallow(<App />).instance().getCurrentPlayer;

    it('odd turns should be player 0, even player 1', function() {
      expect(getCurrentPlayer(3)).to.equal(0);
      expect(getCurrentPlayer(4)).to.equal(1);
    });
  });

  describe('checkIfWon', function() {
    const checkIfWon = shallow(<App />).instance().checkIfWon;
    const winConditions = [[1, 2, 3], [4, 5, 6]];

    it('should return undefined if owned cells dont match any wins', function() {
      const ownedCells = [1, 6, 3];
      expect(checkIfWon(ownedCells, winConditions)).to.equal(undefined);
    });

    it('should return win condition if owned cells contain a win (unordered)', function() {
      const ownedCells = [1, 6, 4, 8, 5];
      expect(checkIfWon(ownedCells, winConditions)).to.be.ok();
      expect(checkIfWon(ownedCells, winConditions)).to.be.an('array');
    });
  });

  describe('getPlayerOwnedIndexes', function() {
    const getPlayerOwnedIndexes = shallow(<App />).instance()
      .getPlayerOwnedIndexes;

    it('should return the indecies at which player markers are', function() {
      const state = [null, 0, 1, null, null, 1, null, 0, null];
      expect(getPlayerOwnedIndexes(state, 0)).to.eql([1, 7]);
    });
  });
});
