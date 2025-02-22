import Koa from 'koa';
import { logger } from '../utils/logger';

export const errorHandler = async (ctx: Koa.Context, next: Koa.Next) => {
    try {
        await next();
    } catch (error) {
        logger.error('Global Error Handler', error);
        ctx.status = error.status || 500;
        ctx.body = {
            error: error.message || 'Internal Server Error',
        };
    }
};