import expect from 'expect.js';

import { generatePoints } from './Triangle';

describe('<Triangle />', function() {
  describe('generatePoints()', function() {
    it('draws a top-right triangle', function() {
      const orientation = ['top', 'right'];
      expect(generatePoints(10, 20, orientation)).to.eql('0,0 10,20 0,20');
    });

    it('draws a top-left triangle', function() {
      const orientation = ['top', 'left'];
      expect(generatePoints(10, 20, orientation)).to.eql('10,0 10,20 0,20');
    });

    it('draws a bottom-right triangle', function() {
      const orientation = ['bottom', 'right'];
      expect(generatePoints(10, 20, orientation)).to.eql('0,0 10,0 0,20');
    });

    it('draws a bottom-left triangle', function() {
      const orientation = ['bottom', 'left'];
      expect(generatePoints(10, 20, orientation)).to.eql('0,0 10,0 10,20');
    });
  });
});
