import React, { Component } from 'react';
import qs from 'querystring';

import Header from '~/components/Header';
import PageTitle from '~/components/PageTitle';
import ProductList from '~/components/ProductList';
import { ProductData } from '~/types/entities';

type Props = {
  title?: string;
  products: ProductData[];
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
        <main className="container">
          <ProductList products={this.props.products} />
        </main>
      </>
    );
  }
}

export default Home;
