import Koa from 'koa';
import { OAuthClient } from '../utils/oauthClient';
import { logger } from '../utils/logger';

export const authMiddleware = async (ctx: Koa.Context, next: Koa.Next) => {
    try {
        const token = ctx.headers.authorization;
        if (!token || token !== `Bearer ${await OAuthClient.getInstance().getToken()}`) {
            ctx.status = 401;
            ctx.body = { error: 'Unauthorized' };
            return;
        }
        await next();
    } catch (error) {
        logger.error('Authentication Middleware Error', error);
        ctx.status = 500;
        ctx.body = { error: 'Internal Server Error' };
    }
};