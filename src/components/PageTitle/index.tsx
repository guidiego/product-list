import React from 'react';
import cx from 'classnames';
import styles from './PageTitle.module.scss';

type Props = {
  title?: string;
};

export const PageTitle: React.FC<Props> = ({ title }) => (
  <div className={styles['page-title']}>
    <div className="container">
      <h2 className={styles['page-title-text']}>{title ? title : 'Lista de Produtos'}</h2>
    </div>
  </div>
);

export default PageTitle;
