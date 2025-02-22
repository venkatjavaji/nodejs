import { z } from 'zod';

export const RequestParamsSchema = z.object({
    id: z.string()
});


// Define validation schemas for API responses
export const Api1ResponseSchema = z.object({
    data: z.string(),
    meta: z.object({
        source: z.string(),
        timestamp: z.string()
    })
});

export const Api2ResponseSchema = z.object({
    data: z.string(),
    status: z.enum(['success', 'failed'])
});

export const ResponseParamsSchema = z.object({
    data: z.string(),
    meta: Api1ResponseSchema.shape.meta,
    status: Api2ResponseSchema.shape.status.optional()
});