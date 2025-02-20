import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import { authMiddleware } from './middlewares/authMiddleware';
import { dataController } from './controllers/dataController';

const app = new Koa();
const router = new Router();

router.get('/data/:id', authMiddleware, dataController);

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

export default app;