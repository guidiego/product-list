import React, { Component } from 'react';
import qs from 'querystring';

import Header from '~/components/Header';
import PageTitle from '~/components/PageTitle';
import ProductList from '~/components/ProductList';
import Pagination from '~/components/Pagination';
import TabList, { Tab } from '~/components/TabList';
import { ProductData } from '~/types/entities';

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

  componentDidMount () {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log('service worker registration successful')
        })
        .catch(err => {
          console.warn('service worker registration failed', err.message)
        })
    }
  }

  render(): React.ReactElement {
    return (
      <>
        <Header />
        <PageTitle title={this.props.title} />
        <main className="container">
          <TabList>
            <Tab text={`${this.props.total} produtos encontrados`} />
          </TabList>
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
