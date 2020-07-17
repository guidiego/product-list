import Router from '@koa/router';
import Product from './model';
import qs from 'querystring';

const router = new Router();

export const createMongoQ = (q) => {
  if (!q) return {};

  const rgxp = { $regex: new RegExp(q, 'gi') };
  return { title: rgxp, description: rgxp, keywords: rgxp };
};

export const getProducts = async (ctx) => {
  const qString = ctx.originalUrl.split('?')[1] || '';
  const qsParsed = qs.decode(qString);
  const limit = qsParsed.limit ? parseInt(qsParsed.limit as string, 10) : 12;
  const page = qsParsed.p ? parseInt(qsParsed.p as string, 10) : 1;
  const skip = limit * (page - 1);
  const query = createMongoQ(qsParsed.q);
  const products = await Product.find(query as any, {}, { skip, limit });
  const total = await Product.countDocuments(query as any);

  ctx.body = { total, limit, page, products };
};

router.get('/', getProducts);

export default router;
