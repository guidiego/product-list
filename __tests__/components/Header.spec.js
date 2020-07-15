import React from 'react';
import { shallow } from 'enzyme';

import Header from '~/components/Header';
import SearchInput from '~/components/SearchInput';

describe('components/SearchInput', () => {
  it('should render default component', () => {
    const wrap = shallow(<Header />);
    expect(wrap.find('.header-container-logo')).toExist();
    expect(wrap.find('.header-container-search')).toExist();
    expect(wrap.find('.header-container-search')).toContainMatchingElement(SearchInput);
  });
});
