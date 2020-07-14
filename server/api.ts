import Router from '@koa/router';

const router = new Router();

const hello = (ctx) => {
  ctx.body = { name: 'John Doe' };
};

router.get('/hello', hello);

export default router;
