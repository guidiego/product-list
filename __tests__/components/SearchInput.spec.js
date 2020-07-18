import React from 'react';
import { shallow } from 'enzyme';

import { SearchInput } from '~/components/SearchInput';

jest.useFakeTimers();

describe('components/SearchInput', () => {
  const fakeFetchResponse = (val) => jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(val),
    })
  )

  const expectSuggestionItemToHaveText = (wrap, result, idx) =>
    expect(
      shallow(wrap.find('.search-input-suggestions-item').get(idx))
    ).toHaveText(result[idx]);

  it('should render default component', () => {
    const router = { query: {}, pathname: '/foo' };
    const wrap = shallow(<SearchInput router={router}/>);
    expect(wrap.find('label')).toHaveClassName('search-input');
    expect(wrap).toContainMatchingElement('input');
    expect(wrap.find('.search-input-suggestions')).not.toExist();
  });

  it('should render SearchInput with initial value in input', () => {
    const q = 'foo';
    const router = { query: { q }, pathname: '/foo' };
    const wrap = shallow(<SearchInput router={router}/>);
    expect(wrap.find('label')).toHaveClassName('search-input');
    expect(wrap).toContainMatchingElement('input');
    expect(wrap.find('input')).toHaveProp('value', q);
    expect(wrap.find('.search-input-suggestions')).not.toExist();
  });

  it('should render SearchInput suggestions and clear them', async () => {
    const result = ['a', 'b'];
    const q = 'foo';
    const router = { query: { q }, pathname: '/foo' };
    const wrap = shallow(<SearchInput router={router}/>);
    const selectValFake = jest.fn();

    global.fetch = fakeFetchResponse({ result });
    await wrap.instance().populateSuggestions();

    expect(wrap.find('.search-input-suggestions')).toExist();
    expect(wrap.find('.search-input-suggestions-item')).toHaveLength(result.length);
    expectSuggestionItemToHaveText(wrap, result, 0);
    expectSuggestionItemToHaveText(wrap, result, 1);

    wrap.instance().selectVal = selectValFake;

    const opt = shallow(wrap.find('.search-input-suggestions-item').get(0));
    opt.simulate('click');
    expect(selectValFake).toHaveBeenCalled(opt.value);

    wrap.instance().resetSuggestions();
    jest.runAllTimers();
    expect(wrap.find('.search-input-suggestions')).not.toExist();
  });

  it('should exec goToQuery correctly', () => {
    const q = 'foo';
    const router = { query: { limit: 10 }, pathname: '/foo', push: jest.fn() };
    const wrap = shallow(<SearchInput router={router}/>);

    wrap.instance().goToQuery(q);

    expect(router.push).toHaveBeenCalledWith({
      pathname: router.pathname,
      query: { ...router.query, q },
    });
  });

  it('should exec goToQuery with addQ', () => {
    const q = 'foo';
    const p = 1;
    const router = { query: { limit: 10 }, pathname: '/foo', push: jest.fn() };
    const wrap = shallow(<SearchInput router={router}/>);

    wrap.instance().goToQuery(q, { p });

    expect(router.push).toHaveBeenCalledWith({
      pathname: router.pathname,
      query: { ...router.query, q, p },
    });
  });

  it('should exec onSubmit correctly', () => {
    const q = 'foo';
    const goToQueryFake = jest.fn();
    const fakeEvent = { preventDefault: jest.fn() };
    const router = { query: { q } };
    const wrap = shallow(<SearchInput router={router}/>);

    wrap.instance().goToQuery = goToQueryFake;
    wrap.instance().onSubmit(fakeEvent);

    expect(fakeEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(goToQueryFake).toHaveBeenCalledWith(q);
  });

  it('should handle onChange correctly', () => {
    const debounceSearchFake = jest.fn();
    const router = { query: {} };
    const wrap = shallow(<SearchInput router={router}/>);
    const createEvent = (value) => ({ target: { value }});

    wrap.instance().debounceSearch = debounceSearchFake;

    const v1 = 'a';
    wrap.instance().onChange(createEvent(v1));
    expect(debounceSearchFake).not.toHaveBeenCalledWith(v1);

    const v2 = 'ab';
    wrap.instance().onChange(createEvent(v2));
    expect(debounceSearchFake).toHaveBeenCalledWith(v2);

    const v3 = 'abc';
    wrap.instance().onChange(createEvent(v3));
    expect(debounceSearchFake).toHaveBeenCalledWith(v3);
  });

  it('should exec debounceSearch correctly', () => {
    const populateSuggestionsFake = jest.fn();
    const router = { query: {} };
    const wrap = shallow(<SearchInput router={router}/>);

    wrap.instance().populateSuggestions = populateSuggestionsFake;

    const q = 'a';
    wrap.instance().debounceSearch(q);
    jest.runAllTimers();
    expect(populateSuggestionsFake).toHaveBeenCalledWith(q);
  });

  it('should exec selectVal correctly', () => {
    const goToQueryFake = jest.fn();
    const setStateFake = jest.fn();
    const router = { query: {} };
    const wrap = shallow(<SearchInput router={router}/>);

    wrap.instance().goToQuery = goToQueryFake;
    wrap.instance().setState = setStateFake;

    const q = 'a';
    wrap.instance().selectVal(q);
    expect(goToQueryFake).toHaveBeenCalledWith(q, { p: 1 });
    expect(setStateFake).toHaveBeenCalledWith({ q });
  });
});
