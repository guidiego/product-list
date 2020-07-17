jest.mock('../../src/server/product/model');
import Product from '~/server/product/model';
import { getProducts, createMongoQ } from '~/server/product/endpoint';

describe('server/product/endpoint', () => {
  const fakeProducts = ['a', 'b', 'c'];
  const fakeCount = fakeProducts.length;

  const expectPage = (ctx, findQ, skip, limit) => {
    expect(Product.find).toHaveBeenCalledWith(findQ, {}, { skip, limit });
    expect(Product.countDocuments).toHaveBeenCalledWith(findQ);

    expect(ctx.body).toHaveProperty('total', fakeCount);
    expect(ctx.body).toHaveProperty('limit', limit);
    expect(ctx.body).toHaveProperty('products', fakeProducts);
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should exec getProducts without page, limit and q', async () => {
    Product.find.mockResolvedValue(fakeProducts);
    Product.countDocuments.mockResolvedValue(fakeCount);

    const originalUrl = '/foo';
    const ctx = { originalUrl };
    await getProducts(ctx);

    expectPage(ctx, {}, 0, 12);
  });

  it('should exec getProducts with page', async () => {
    Product.find.mockResolvedValue(fakeProducts);
    Product.countDocuments.mockResolvedValue(fakeCount);

    const originalUrl = '/foo?p=2';
    const ctx = { originalUrl };
    await getProducts(ctx);

    expectPage(ctx, {}, 12, 12);
  });

  it('should exec getProducts with limit', async () => {
    Product.find.mockResolvedValue(fakeProducts);
    Product.countDocuments.mockResolvedValue(fakeCount);

    const originalUrl = '/foo?limit=20';
    const ctx = { originalUrl };
    await getProducts(ctx);

    expectPage(ctx, {}, 0, 20);
  });

  it('should exec getProducts with page and limit', async () => {
    Product.find.mockResolvedValue(fakeProducts);
    Product.countDocuments.mockResolvedValue(fakeCount);

    const originalUrl = '/foo?p=2&limit=20';
    const ctx = { originalUrl };
    await getProducts(ctx);

    expectPage(ctx, {}, 20, 20);
  });

  it('should exec getProducts with page and limit', async () => {
    Product.find.mockResolvedValue(fakeProducts);
    Product.countDocuments.mockResolvedValue(fakeCount);

    const originalUrl = '/foo?p=2&limit=20';
    const ctx = { originalUrl };
    await getProducts(ctx);

    expectPage(ctx, {}, 20, 20);
  });

  it('should exec getProducts with q', async () => {
    Product.find.mockResolvedValue(fakeProducts);
    Product.countDocuments.mockResolvedValue(fakeCount);

    const q = 'bar';
    const originalUrl = '/foo?q=' + q;
    const ctx = { originalUrl };
    const query = createMongoQ(q)
    await getProducts(ctx);

    expectPage(ctx, query, 0, 12);
  });

  it('should exec getProducts with page and q', async () => {
    Product.find.mockResolvedValue(fakeProducts);
    Product.countDocuments.mockResolvedValue(fakeCount);

    const q = 'bar';
    const originalUrl = '/foo?p=2&q=' + q;
    const ctx = { originalUrl };
    const query = createMongoQ(q)
    await getProducts(ctx);

    expectPage(ctx, query, 12, 12);
  });

  it('should exec getProducts with all params', async () => {
    Product.find.mockResolvedValue(fakeProducts);
    Product.countDocuments.mockResolvedValue(fakeCount);

    const q = 'bar';
    const originalUrl = '/foo?p=2&limit=15&q=' + q;
    const ctx = { originalUrl };
    const query = createMongoQ(q)
    await getProducts(ctx);

    expectPage(ctx, query, 15, 15);
  });
});
