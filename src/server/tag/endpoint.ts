import Router from '@koa/router';
import { coreWords } from './model';
import qs from 'querystring';

const router = new Router();

export const getTags = async (ctx) => {
  const qString = ctx.originalUrl.split('?')[1] || '';
  const q = qs.decode(qString).q as string;
  const rgxp = new RegExp(q, 'gi');
  const result = coreWords.filter((w) => w.match(rgxp));
  ctx.body = { result };
};

router.get('/', getTags);

export default router;
