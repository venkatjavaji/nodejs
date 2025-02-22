import axios from 'axios';
import { Api1ResponseSchema, Api2ResponseSchema, ResponseParamsSchema } from '../schemas/zodSchemas';
import { logger } from '../utils/logger';
import { OAuthClient } from '../utils/oauthClient';

export class MyService {
    async fetchData(id: string) {
        try {
            if (process.env.NODE_ENV !== 'test') {
                logger.info('Returning dummy data for test environment');
                return ResponseParamsSchema.parse({
                    data: `Dummy data for ID: ${id}`,
                    meta: { source: 'test', timestamp: new Date().toISOString() },
                    status: 'success'
                });
            }

            const token = await OAuthClient.getInstance().getToken();
            const headers = { Authorization: `Bearer ${token}` };

            // Run both API calls in parallel
            const [response1, response2] = await Promise.all([
                axios.get(`https://api.example.com/data1/${id}`, { headers }),
                axios.get(`https://api.example.com/data2/${id}`, { headers })
            ]);

            // Validate API responses
            const validatedResponse1 = Api1ResponseSchema.parse(response1.data);
            const validatedResponse2 = Api2ResponseSchema.parse(response2.data);

            return ResponseParamsSchema.parse({ data: validatedResponse1.data + validatedResponse2.data });

        } catch (error) {
            logger.error('Service Error', error);
            throw new Error('Service call failed');
        }
    }
}