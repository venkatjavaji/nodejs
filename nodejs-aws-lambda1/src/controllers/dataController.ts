import Koa from 'koa';
import { RequestParamsSchema } from '../schemas/zodSchemas';
import { MyService } from '../services/myService';
import { logger } from '../utils/logger';

export const dataController = async (ctx: Koa.Context) => {
    try {
        const params = RequestParamsSchema.parse(ctx.params);
        const service = new MyService();
        ctx.body = await service.fetchData(params.id);
    } catch (error) {
        logger.error('Controller Error', error);
        // ctx.status = 400;
        // ctx.body = { error: error.message };
        throw error; // Let the global error handler catch and process this
    }
}; 