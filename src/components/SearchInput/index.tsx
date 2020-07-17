import React, { Component } from 'react';
import SearchIcon from './searchIcon.svg';
import styles from './SearchInput.module.scss';
import { withRouter, Router } from 'next/router';

type Props = { router: Router };
type State = { q: string };

export class SearchInput extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { q: (this.props.router.query.q as string) || '' };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const { router } = this.props;
    const query = { ...router.query, q: this.state.q };
    router.push({ pathname: router.pathname, query });
  }

  onChange(e) {
    this.setState({ q: e.target.value });
  }

  render(): React.ReactElement {
    return (
      <form onSubmit={this.onSubmit}>
        <label className={styles['search-input']}>
          <SearchIcon className={styles['search-input-icon']} />
          <input
            className={styles['search-input-input']}
            placeholder="Buscar produtos"
            value={this.state.q}
            onChange={this.onChange}
          />
        </label>
      </form>
    );
  }
}

export default withRouter(SearchInput);
