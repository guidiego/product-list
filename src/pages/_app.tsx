import React from 'react';
import Head from 'next/head';

type Props = {
  Component: React.FC;
  pageProps: AnyObject;
};

const App = ({ Component, pageProps }: Props): React.ReactElement => (
  <>
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;800&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="/styles.css" type="text/css" media="all" />
    </Head>
    <Component {...pageProps} />
  </>
);

export default App;
