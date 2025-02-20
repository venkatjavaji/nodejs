import axios from 'axios';
import { ResponseParamsSchema } from '../schemas/zodSchemas';
import { logger } from '../utils/logger';
import { OAuthClient } from '../utils/oauthClient';

export class MyService {
    async fetchData(id: string) {
        try {
            const token = await OAuthClient.getInstance().getToken();
            const headers = { Authorization: `Bearer ${token}` };

            const response1 = await axios.get(`https://api.example.com/data1/${id}`, { headers });
            const response2 = await axios.get(`https://api.example.com/data2/${id}`, { headers });

            return ResponseParamsSchema.parse({ data: response1.data + response2.data });
        } catch (error) {
            logger.error('Service Error', error);
            throw new Error('Service call failed');
        }
    }
}