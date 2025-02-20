import { z } from 'zod';

export const RequestParamsSchema = z.object({
    id: z.string().uuid()
});

export const ResponseParamsSchema = z.object({
    data: z.string()
});