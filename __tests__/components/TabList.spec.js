import React from 'react';
import { shallow } from 'enzyme';

import { TabList, Tab } from '~/components/TabList';

describe('components/TabList', () => {
  it('should render default Tab', () => {
    const text = 'Foo';
    const wrap = shallow(<Tab text={text}/>);

    expect(wrap).toHaveClassName('tab');
    expect(wrap).toHaveClassName('tab-active');
    expect(wrap).toHaveText(text);
  });

  it('should render default TabList', () => {
    const text = 'Foo';
    const wrap = shallow(
      <TabList>
        <Tab text={text} />
      </TabList>
    );

    expect(wrap).toHaveClassName('tab-list');
    expect(wrap.find('Tab')).toHaveLength(1);
    expect(wrap.find('Tab')).toHaveProp('text', text);
  });
});
