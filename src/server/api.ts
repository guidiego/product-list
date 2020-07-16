import Router from '@koa/router';
import product from './product/endpoint';

const router = new Router();

router.use('/product', product.routes());

export default router;
