import React, { Component } from 'react';
import qs from 'querystring';

import Header from '~/components/Header';
import PageTitle from '~/components/PageTitle';
import ProductList from '~/components/ProductList';
import { ProductData } from '~/types/entities';
import Pagination from '~/components/Pagination';

type Props = {
  title?: string;
  total: number;
  limit: number;
  page: number;
  products: ProductData[];
};

export class Home extends Component<Props> {
  static getInitialProps = async (ctx) => {
    let uri = '';

    if (process.browser) {
      uri = window.location.origin;
    } else {
      uri = `${process.env.PROTOCOL}://${ctx.req.headers.host}`;
    }

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
        <div className="container">
          <Pagination total={this.props.total} limit={this.props.limit} page={this.props.page} q={this.props.title} />
        </div>
      </>
    );
  }
}

export default Home;
