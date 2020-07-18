import React from 'react';
import cx from 'classnames';
import Link from 'next/link';

import SearchInput from '~/components/SearchInput';
import styles from './Header.module.scss';

export const Header: React.FC = () => (
  <>
    <div className={styles.header}>
      <div className={cx(styles['header-container'], 'container')}>
        <Link href="/">
          <a className={styles['header-container-logo']}>mmartan</a>
        </Link>
        <div className={styles['header-container-search']}>
          <SearchInput />
        </div>
      </div>
    </div>
    <div className={styles['header-sub-mobile']}>
      <SearchInput />
    </div>
  </>
);

export default Header;
