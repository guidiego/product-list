import React, { Component } from 'react';
import Header from '~/components/Header';
import PageTitle from '~/components/PageTitle';
import qs from 'querystring';

type Props = {
  title?: string;
};

export class Home extends Component<Props> {
  static getInitialProps = async (ctx) => {
    const uri = `http://${ctx.req.headers.host}`;
    const res = await fetch(uri + '/api/product?' + qs.encode(ctx.query));
    const props = await res.json();
    return { title: ctx.query.q, ...props };
  };

  render(): React.ReactElement {
    return (
      <>
        <Header />
        <PageTitle title={this.props.title} />
        <main style={{ height: '2000px' }} />
      </>
    );
  }
}

export default Home;
