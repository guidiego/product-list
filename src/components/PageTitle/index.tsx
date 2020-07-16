import React from 'react';
import styles from './PageTitle.module.scss';
import PropTypes from 'prop-types';

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

PageTitle.propTypes = {
  title: PropTypes.string,
};

export default PageTitle;
