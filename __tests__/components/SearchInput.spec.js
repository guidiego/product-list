import React from 'react';
import { shallow } from 'enzyme';

import SearchInput from '~/components/SearchInput';

describe('components/SearchInput', () => {
  it('should render default component', () => {
    const wrap = shallow(<SearchInput />);
    expect(wrap).toHaveClassName('search-input');
    expect(wrap).toContainMatchingElement('input');
  });
});
