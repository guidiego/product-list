import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import styles from './TabList.module.scss';

type TabProps = {
  text: string;
};

export const Tab: React.FC<TabProps> = ({ text }) => (
  <div className={cx(styles['tab'], styles['tab-active'])}>{text}</div>
);

type TabListProps = {
  children: React.ReactNode;
};

export const TabList: React.FC<TabListProps> = ({ children }) => <div className={styles['tab-list']}>{children}</div>;

Tab.propTypes = {
  text: PropTypes.string,
};

TabList.propTypes = {
  children: PropTypes.node,
};

export default TabList;
