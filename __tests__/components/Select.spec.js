import React from 'react';
import { shallow } from 'enzyme';

import Select from '~/components/Select';

describe('components/Select', () => {
  const expectOptionRenderWithVal = (optionWrap) => (val, idx) => {
    expect(
      shallow(optionWrap.get(idx))
    ).toHaveText(`${val} Items`);
  }

  it('should render default component', () => {
    const options = ["foo", "bar"];
    const wrap = shallow(<Select options={options} />);

    expect(wrap).toHaveClassName('select');
    expect(wrap.find('.select-placeholder')).toHaveText(`${options[0]} Items`);
    expect(wrap.find('select option')).toHaveLength(options.length);
    options.forEach(
      expectOptionRenderWithVal(
        wrap.find('select option')
      )
    );
  });

  it('should handle onChange correctly', () => {
    const options = ["foo", "bar"];
    const value = "bar";
    const onChange = jest.fn();
    const setStateFake = jest.fn();
    const wrap = shallow(<Select options={options} onChange={onChange} />);

    wrap.instance().setState = setStateFake;
    wrap.instance().onChange({ target: { value }});

    expect(onChange).toHaveBeenCalledWith(value);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(setStateFake).toHaveBeenCalledWith({ value });
    expect(setStateFake).toHaveBeenCalledTimes(1);
  });
});
