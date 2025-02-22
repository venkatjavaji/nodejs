import Router from '@koa/router';
import { authMiddleware } from '../middlewares/authMiddleware';
import { dataController } from '../controllers/dataController';

const router = new Router();

router.get('/data/:id', authMiddleware, dataController);

export { router };