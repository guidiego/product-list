import React from 'react';
import Head from 'next/head';

type Props = {
  Component: React.FC;
  pageProps: AnyObject;
};

const App = ({ Component, pageProps }: Props): React.ReactElement => (
  <>
    <Head>
      <title>Busca - mmartan</title>
      <meta name="description" content="Busca de produtos no site da mmartan" />
      <link rel="icon" href="/favicon.png" />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;600;800&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/styles.css" type="text/css" media="all" />
    </Head>
    <Component {...pageProps} />
  </>
);

export default App;
