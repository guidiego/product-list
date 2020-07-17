import { coreWords } from '~/server/tag/model';
import { getTags } from '~/server/tag/endpoint';

/**
 * BruteForce tests
 */
describe('server/tag/endpoint', () => {
  it('should exec getProducts without q', async () => {
    const originalUrl = '/foo';
    const ctx = { originalUrl };
    await getTags(ctx);

    expect(ctx.body).toHaveProperty('result', coreWords);
  });

  it('should exec getProducts with partial q', async () => {
    const originalUrl = '/foo?q=len';
    const ctx = { originalUrl };
    await getTags(ctx);

    expect(ctx.body.result).toHaveLength(2);
    expect(ctx.body).toHaveProperty('result.0', 'Lençol');
    expect(ctx.body).toHaveProperty('result.1', 'Lençois');

  });

  it('should exec getProducts with full q', async () => {
    const originalUrl = '/foo?q=Algodão';
    const ctx = { originalUrl };
    await getTags(ctx);

    expect(ctx.body.result).toHaveLength(1)
    expect(ctx.body).toHaveProperty('result.0', 'Algodão');
  });

});
