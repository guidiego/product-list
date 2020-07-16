import Koa from 'koa';
import Router from '@koa/router';
import next from 'next';
import api from './api';
import mongoConnect from './db';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const { DB_URL, DB_NAME } = process.env;

app
  .prepare()
  .then(() => mongoConnect({ db: `${DB_URL}/${DB_NAME}` }))
  .then(() => {
    mongoConnect({ db: `${DB_URL}/${DB_NAME}` });
    const server = new Koa();
    const router = new Router();

    router.use('/api', api.routes());

    router.all('(.*)', async (ctx) => {
      await handle(ctx.req, ctx.res);
      ctx.respond = false;
    });

    server.use(async (ctx, next) => {
      ctx.res.statusCode = 200;
      await next();
    });

    server.use(router.routes());

    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
