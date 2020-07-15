import Koa from 'koa';
import Router from '@koa/router';
import next from 'next';
import api from './api';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  router.use('/api', api.routes());
  // router.get('/public/(.*)', async (ctx) => {
  //   const filePath = path.resolve(__dirname, `..${ctx.req.url}`);
  //   app.serveStatic(ctx.req, ctx.res, ctx.req.url).then((some) => {
  //     console.log(some);
  //   });
  // });

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
