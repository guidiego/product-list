import Router from '@koa/router';
import product from './product/endpoint';
import tag from './tag/endpoint';

const router = new Router();

router.use('/product', product.routes());
router.use('/tag', tag.routes());

export default router;
