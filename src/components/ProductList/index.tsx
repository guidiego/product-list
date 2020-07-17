import React from 'react';
import PropTypes from 'prop-types';

import { ProductData } from '~/types/entities';
import { priceFormat } from '~/utils/priceFormat';

import styles from './ProductList.module.scss';

type Props = {
  products: ProductData[];
};

/**
 * I won't create Product component out of it because didn't had a
 * case for that test that implicate in use it in another place single
 */
export const Product = ({ title, priceFrom, priceTo, photoStill, isNewRelease }: ProductData) => {
  const hasDiscount = priceFrom != priceTo;
  const discount = 100 - ((priceTo as any) / (priceFrom as any)) * 100;
  const baseUrl = process.env.STATIC_CACHE_URL;

  return (
    <a href="/#" target="_blank" className={styles['product']}>
      <div className={styles['product-thumb']} style={{ backgroundImage: `url('${baseUrl}${photoStill}')` }}>
        {!hasDiscount ? null : <div className={styles['product-thumb-discount']}>{Math.round(discount)}% off</div>}
        {!hasDiscount && isNewRelease ? <div className={styles['product-thumb-new']}>New</div> : null}
      </div>
      <div className={styles['product-info']}>
        <h2 className={styles['product-info-title']}>{title}</h2>
        <div>
          <div className={styles['product-info-old-price']}>{hasDiscount ? `R$ ${priceFormat(priceFrom)}` : ''}</div>
          <div className={styles['product-info-price']}>R$ {priceFormat(priceTo)}</div>
        </div>
      </div>
    </a>
  );
};
export const ProductList: React.FC<Props> = ({ products = [] }) =>
  products.length === 0 ? (
    <div className={styles['product-list-not-found']}>Nenhum produto foi encontrado com esse termo :(</div>
  ) : (
    <ul className={styles['product-list']}>
      {products.map((product) => (
        <li key={product._id} className={styles['product-list-item']}>
          <Product {...product} />
        </li>
      ))}
    </ul>
  );

ProductList.propTypes = {
  products: PropTypes.array,
};

export default ProductList;
