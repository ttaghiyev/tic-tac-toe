import expect from 'expect.js';

import { getCellMarker } from './Cell';

describe('<Cell />', function() {
  describe('getCellMarker()', function() {
    it('should return marker based on player index or null', function() {
      expect(getCellMarker(null)).to.not.be.ok();
      expect(getCellMarker(0)).to.equal('x');
      expect(getCellMarker(1)).to.equal('o');
    });
  });
});
