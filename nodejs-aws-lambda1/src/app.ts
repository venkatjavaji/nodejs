import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { errorHandler } from './middlewares/errorHandler';
import { router } from './routes/router';
import * as dotenv from 'dotenv';
import { logger } from './utils/logger';

dotenv.config();

const app = new Koa();

logger.info(`Running in ${process.env.NODE_ENV} mode`);

const PORT = process.env.PORT || 3000;

app.use(errorHandler); // Global error handling middleware
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

if (process.env.NODE_ENV === 'test') {
    app.listen(PORT, () => {
        logger.info(`Server running on http://localhost:${PORT}`);
    });
}

export default app;