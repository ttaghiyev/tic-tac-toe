import React from 'react';
import expect from 'expect.js';
import { shallow } from 'enzyme';

import { Digits } from './Digits';

describe.only('<Digits />', function() {
  describe('render()', function() {
    it('single digis are prefixed by wrapped 0', function() {
      const wrapper = shallow(<Digits val={2} />);
      expect(wrapper.find('span').text()).to.be('02');
      expect(wrapper.find('i').text()).to.be('0');
    });
    it('double digits are printed as is', function() {
      const wrapper = shallow(<Digits val={12} />);
      expect(wrapper.find('span').text()).to.be('12');
    });
  });
});
