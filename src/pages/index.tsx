import React from 'react';
import Head from 'next/head';

import Header from '~/components/Header';
import SearchInput from '~/components/SearchInput';

export const Home = () => (
  <div className="container">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="/styles.css" type="text/css" media="all" />
    </Head>
    <Header>
      <SearchInput />
    </Header>
    <main style={{ height: '2000px' }} />
  </div>
);

export default Home;
