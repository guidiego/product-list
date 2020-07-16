import React from 'react';
import Header from '~/components/Header';
import PageTitle from '~/components/PageTitle';

export const Home: React.FC = () => (
  <>
    <Header />
    <PageTitle />
    <main style={{ height: '2000px' }} />
  </>
);

export default Home;
