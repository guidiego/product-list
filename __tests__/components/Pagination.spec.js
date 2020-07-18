import React from 'react';
import { shallow } from 'enzyme';

import Pagination, { onChange } from '~/components/Pagination';

describe('components/Pagination', () => {
  const getPageItem = (wrap, idx) => shallow(
    wrap.find('.pagination .pagination-item Link').get(idx)
  );

  it('should render default component', () => {
    const props = {
      total: 10,
      limit: 10,
      page: 1,
    }
    const wrap = shallow(<Pagination {...props} />);
    expect(wrap).toHaveClassName('pagination-wrap');
    expect(wrap.find('.pagination')).toExist();
    expect(getPageItem(wrap, 0)).toHaveText('<');
    expect(getPageItem(wrap, 1)).toHaveText('1');
    expect(getPageItem(wrap, 2)).toHaveText('>');
  });

  it('should render Pagination with initial ellipsis', () => {
    const props = {
      q: 'Foo',
      total: 80,
      limit: 10,
      page: 1,
    }
    const wrap = shallow(<Pagination {...props} />);
    expect(wrap).toHaveClassName('pagination-wrap');
    expect(wrap.find('.pagination')).toExist();
    expect(getPageItem(wrap, 0)).toHaveText('<');
    expect(getPageItem(wrap, 1)).toHaveText('1');
    expect(getPageItem(wrap, 2)).toHaveText('2');
    expect(getPageItem(wrap, 3)).toHaveText('...');
    expect(getPageItem(wrap, 4)).toHaveText('7');
    expect(getPageItem(wrap, 5)).toHaveText('8');
    expect(getPageItem(wrap, 6)).toHaveText('>');
  });

  it('should render Pagination with final ellipsis', () => {
    const props = {
      q: 'Foo',
      total: 80,
      limit: 10,
      page: 7,
    }
    const wrap = shallow(<Pagination {...props} />);
    expect(wrap).toHaveClassName('pagination-wrap');
    expect(wrap.find('.pagination')).toExist();
    expect(getPageItem(wrap, 0)).toHaveText('<');
    expect(getPageItem(wrap, 1)).toHaveText('1');
    expect(getPageItem(wrap, 2)).toHaveText('2');
    expect(getPageItem(wrap, 3)).toHaveText('3');
    expect(getPageItem(wrap, 4)).toHaveText('...');
    expect(getPageItem(wrap, 5)).toHaveText('5');
    expect(getPageItem(wrap, 6)).toHaveText('6');
    expect(getPageItem(wrap, 7)).toHaveText('7');
    expect(getPageItem(wrap, 8)).toHaveText('8');
    expect(getPageItem(wrap, 9)).toHaveText('>');
  });

  it('should render Pagination with no ellipsis by offset rule', () => {
    const props = {
      q: 'Foo',
      total: 80,
      limit: 10,
      page: 6,
    }
    const wrap = shallow(<Pagination {...props} />);
    expect(wrap).toHaveClassName('pagination-wrap');
    expect(wrap.find('.pagination')).toExist();
    expect(getPageItem(wrap, 0)).toHaveText('<');
    expect(getPageItem(wrap, 1)).toHaveText('1');
    expect(getPageItem(wrap, 2)).toHaveText('2');
    expect(getPageItem(wrap, 3)).toHaveText('3');
    expect(getPageItem(wrap, 4)).toHaveText('4');
    expect(getPageItem(wrap, 5)).toHaveText('5');
    expect(getPageItem(wrap, 6)).toHaveText('6');
    expect(getPageItem(wrap, 7)).toHaveText('7');
    expect(getPageItem(wrap, 8)).toHaveText('8');
    expect(getPageItem(wrap, 9)).toHaveText('>');
  });

  it('should exec onChange correctly', () => {
    const q = 'x';
    const limit = 100;
    const fakeRouter = { pathname: '/foo', query: { q }, push: jest.fn() };

    onChange(fakeRouter)(limit);

    expect(fakeRouter.push).toHaveBeenCalledWith({
      pathname: fakeRouter.pathname,
      query: { q, limit, p: 1 }
    });
  });
});
