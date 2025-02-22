import axios from 'axios';
import { logger } from './logger';

export class OAuthClient {
    private static instance: OAuthClient;
    private token: string = '';
    private tokenExpiry: number = 0;

    private constructor() { }

    static getInstance(): OAuthClient {
        if (!OAuthClient.instance) {
            OAuthClient.instance = new OAuthClient();
        }
        return OAuthClient.instance;
    }

    async getToken(): Promise<string> {
        if (this.token && this.tokenExpiry > Date.now()) {
            return this.token;
        }

        if (process.env.NODE_ENV === 'test') {
            logger.info('Generating dummy token for test environment');
            this.token = 'dummy-test-token';
            this.tokenExpiry = Date.now() + 3600 * 1000; // 1 hour expiry
            return this.token;
        }

        try {
            const response = await axios.post('https://auth.example.com/token', {
                client_id: 'your-client-id',
                client_secret: 'your-client-secret',
                grant_type: 'client_credentials'
            });
            this.token = response.data.access_token;
            this.tokenExpiry = Date.now() + response.data.expires_in * 1000;
            return this.token;
        } catch (error) {
            logger.error('Failed to fetch OAuth token', error);
            throw new Error('Authentication Failed');
        }
    }
}