import React, { Component } from 'react';
import SearchIcon from './searchIcon.svg';
import styles from './SearchInput.module.scss';

export class SearchInput extends Component {
  render(): React.ReactElement {
    return (
      <label className={styles['search-input']}>
        <SearchIcon className={styles['search-input-icon']} />
        <input />
      </label>
    );
  }
}

export default SearchInput;
