import React from 'react';
import { shallow } from 'enzyme';

import ProductList, { Product } from '~/components/ProductList';
import { priceFormat } from '~/utils/priceFormat';

describe('components/ProductList', () => {
    const ProductFactory = (_id, title, priceFrom, priceTo, photoStill, isNewRelease, brand = {}) => ({
      _id, title, priceFrom, priceTo, photoStill, isNewRelease, brand
    });

    const p1 = ProductFactory("AA1", "foo", 90, 90, "bar", false, { initials: 'CM' });
    const p2 = ProductFactory("BB2", "fizz", 100, 50, "fuzz", true);
    const p3 = ProductFactory("CC3", "foobar", 80, 80, "fizzfuzz", true);
    const products = [p1, p2, p3];

  it('should render default ProductList', () => {
    const wrap = shallow(<ProductList />);
    expect(wrap).toHaveClassName('product-list-not-found');
    expect(wrap).toHaveText('Nenhum produto foi encontrado com esse termo :(');
    expect(wrap.find('li').find(Product)).toHaveLength(0);
  });

  it('should render ProductList with products', () => {
    const wrap = shallow(<ProductList products={products} />);
    expect(wrap).toHaveClassName('product-list');
    expect(wrap.find('li')).toHaveClassName('product-list-item');
    expect(wrap.find('li').find(Product)).toHaveLength(3);
  });

  const defaultProductCheck = (wrap, p) => {
    expect(wrap).toHaveClassName('product');
    expect(wrap.find('.product-thumb')).toHaveStyle('backgroundImage', `url('${process.env.STATIC_CACHE_URL}${p.photoStill}')`);
    expect(wrap.find('.product-info-title')).toHaveText(p.title);
    expect(wrap.find('.product-info-price')).toHaveText(`R$ ${priceFormat(p.priceTo)}`);
  }

  it('should render default product', () => {
    const wrap = shallow(<Product {...p1} />);

    expect(wrap).toHaveClassName('product');
    expect(wrap.find('.product-info-title')).toHaveText(p1.title);
    expect(wrap.find('.product-info-old-price')).toHaveText('');
    expect(wrap.find('.product-info-price')).toHaveText(`R$ ${priceFormat(p1.priceTo)}`);
  });


  it('should render default product', () => {
    const wrap = shallow(<Product {...p1} />);

    defaultProductCheck(wrap, p1);
    expect(wrap.find('.product-thumb Brand')).toExist();
    expect(wrap.find('.product-info-old-price')).toHaveText('');
    expect(wrap.find('.product-thumb-discount')).not.toExist();
    expect(wrap.find('.product-thumb-new')).not.toExist();
  });

  it('should render product with discount', () => {
    const wrap = shallow(<Product {...p2} />);

    defaultProductCheck(wrap, p2);
    expect(wrap.find('.product-info-old-price')).toHaveText(`R$ ${priceFormat(p2.priceFrom)}`);
    expect(wrap.find('.product-thumb-discount')).toExist();
    expect(wrap.find('.product-thumb-new')).not.toExist();
    expect(wrap.find('.product-thumb-discount')).toHaveText(`50% off`);
  });

  it('should render product with new flag', () => {
    const wrap = shallow(<Product {...p3} />);

    defaultProductCheck(wrap, p3);
    expect(wrap.find('.product-info-old-price')).toHaveText('');
    expect(wrap.find('.product-thumb-discount')).not.toExist();
    expect(wrap.find('.product-thumb-new')).toExist();
    expect(wrap.find('.product-thumb-new')).toHaveText('New');
  });
});
