import React from 'react';
import { shallow } from 'enzyme';

import PageTitle from '~/components/PageTitle';

describe('components/SearchInput', () => {

  const checker = (wrap, title) => {
    expect(wrap).toContainMatchingElement('h2');
    expect(wrap.find('h2')).toHaveText(title);
  };

  it('should render default component', () => {
    const wrap = shallow(<PageTitle />);
    checker(wrap, 'Lista de Produtos');
  });

  it('should render component with title prop', () => {
    const title = 'Foo';
    const wrap = shallow(<PageTitle title={title} />);
    checker(wrap, title);
  });


});
