import React from 'react';
import cx from 'classnames';
import styles from './Header.module.scss';

type Props = {
  children: React.ReactNode;
};

export const Header: React.FC<Props> = ({ children }: Props) => (
  <div className={styles.header}>
    <div className={cx(styles['header-container'], 'container')}>
      <div className={styles['header-container-logo']}>Productify</div>
      <div className={styles['header-container-body']}>{children}</div>
    </div>
  </div>
);

export default Header;
