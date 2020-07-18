import React, { Component } from 'react';
import SearchIcon from './searchIcon.svg';
import styles from './SearchInput.module.scss';
import { withRouter, Router } from 'next/router';

type Props = { router: Router };
type State = { q: string; suggestions: string[] };

export class SearchInput extends Component<Props, State> {
  _searchTimeout = null;

  constructor(props) {
    super(props);
    this._searchTimeout = null;
    this.state = { q: (this.props.router.query.q as string) || '', suggestions: [] };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.resetSuggestions = this.resetSuggestions.bind(this);
  }

  goToQuery(q, addQ = {}) {
    const { router } = this.props;
    const query = { ...router.query, q, ...addQ };
    router.push({ pathname: router.pathname, query });
  }

  onSubmit(e) {
    e.preventDefault();
    this.goToQuery(this.state.q);
  }

  selectVal(q) {
    this.setState({ q });
    this.goToQuery(q, { p: 1 });
  }

  onChange(e) {
    this.setState({ q: e.target.value });

    if (e.target.value.length >= 2) {
      this.debounceSearch(e.target.value);
    }
  }

  async populateSuggestions(val) {
    const res = await fetch(`${window.location.origin}/api/tag?q=${val}`);
    const { result } = await res.json();
    this.setState({ suggestions: result });
  }

  debounceSearch(val) {
    clearTimeout(this._searchTimeout);
    this._searchTimeout = setTimeout(() => {
      this.populateSuggestions(val);
    }, 500);
  }

  resetSuggestions() {
    setTimeout(() => {
      this.setState({ suggestions: [] });
    }, 100); // Hack to handle a click before clear;
  }

  render(): React.ReactElement {
    const { q, suggestions } = this.state;

    return (
      <form className={styles['search-input-wrap']} onSubmit={this.onSubmit}>
        {suggestions.length == 0 ? null : (
          <div className={styles['search-input-suggestions']}>
            {suggestions.map((s) => (
              <div key={s} onClick={() => this.selectVal(s)} className={styles['search-input-suggestions-item']}>
                {s}
              </div>
            ))}
          </div>
        )}
        <label className={styles['search-input']}>
          <SearchIcon className={styles['search-input-icon']} />
          <input
            className={styles['search-input-input']}
            placeholder="Buscar produtos"
            value={q}
            onChange={this.onChange}
            onBlur={this.resetSuggestions}
          />
        </label>
      </form>
    );
  }
}

export default withRouter(SearchInput);
