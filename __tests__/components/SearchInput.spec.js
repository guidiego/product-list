import React from 'react';
import { shallow } from 'enzyme';

import { SearchInput } from '~/components/SearchInput';

describe('components/SearchInput', () => {
  it('should render default component', () => {
    const router = { query: {}, pathname: '/foo' };
    const wrap = shallow(<SearchInput router={router}/>);
    expect(wrap.find('label')).toHaveClassName('search-input');
    expect(wrap).toContainMatchingElement('input');
  });
});
