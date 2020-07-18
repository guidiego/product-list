import React, { Component } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './Pagination.module.scss';
import Select from '~/components/Select';

type Props = {
  q: string;
  total: number;
  limit: number;
  page: number;
};

const LIMIT_OPTIONS = [12, 24, 36, 48];

const getPageOpts = ({ total, limit, page }: Props) => {
  const offset = 2;
  const totalPages = Math.floor(total / limit);
  const nextPage = page + 1;
  const prevPage = page - 1;
  const hasNext = nextPage <= totalPages;
  const hasPrev = page > 1;
  const rangePages: (number | string)[] = new Array(totalPages).fill(1).map((v, idx) => idx + v);
  const activeIdx = rangePages.indexOf(page);
  const startCursor = activeIdx - offset;
  const endCursor = activeIdx + offset;
  const hasElipsisInPrev = startCursor > 1;
  const hasElipsisIOnNext = endCursor < totalPages;
  let pages = rangePages.slice(!hasElipsisInPrev ? 0 : startCursor, !hasElipsisIOnNext ? totalPages : endCursor);

  if (startCursor > 1) {
    const initialPages = rangePages.slice(0, offset + 1);

    if (startCursor > offset + 1) {
      initialPages.push('...');
    }

    pages = [...initialPages, ...pages];
  }

  if (endCursor < totalPages) {
    const offsetVisionGreaterThanTotalPages = endCursor + offset >= totalPages;
    const finalCursor = offsetVisionGreaterThanTotalPages ? endCursor : totalPages - offset;
    const finalPages = rangePages.slice(finalCursor, totalPages + 1);

    if (offsetVisionGreaterThanTotalPages) {
      pages = [...pages, ...finalPages];
    } else {
      pages = [...pages, '...', ...finalPages];
    }
  }

  return { currentPage: page, pages, nextPage, hasNext, prevPage, hasPrev };
};

const createLinkProps = ({ limit, q }) => {
  const props = { limit };
  return q ? { ...props, q } : props;
};

export const onChange = (router) => (limit) => {
  router.push({ pathname: router.pathname, query: { ...router.query, limit, p: 1 } });
};

export const Pagination: React.FC<Props> = (props) => {
  const router = useRouter();
  const linkProps = createLinkProps(props);
  const { currentPage, pages, nextPage, hasNext, prevPage, hasPrev } = getPageOpts(props);

  return (
    <div className={styles['pagination-wrap']}>
      <div className={styles['limiter']}>
        <Select options={LIMIT_OPTIONS} onChange={onChange(router)} />
      </div>
      <ul className={styles['pagination']}>
        <li className={cx(styles['pagination-item'], { [styles['pagination-item-block']]: !hasPrev })}>
          <Link href={{ pathname: '/', query: { ...linkProps, p: prevPage } }}>
            <a>{'<'}</a>
          </Link>
        </li>
        {pages.map((p, idx) => (
          <li
            key={`p-${idx}`}
            className={cx(styles['pagination-item'], { [styles['pagination-item-active']]: p === currentPage })}
          >
            <Link href={{ pathname: '/', query: { ...linkProps, p } }}>
              <a>{p}</a>
            </Link>
          </li>
        ))}
        <li className={cx(styles['pagination-item'], { [styles['pagination-item-block']]: !hasNext })}>
          <Link href={{ pathname: '/', query: { ...linkProps, p: nextPage } }}>
            <a>{'>'}</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
