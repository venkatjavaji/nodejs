import { createServer, proxy } from 'aws-serverless-express';
import app from './app';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';


const awsServerlessKoa = (app: any) => {
    const server = createServer(app.callback());
    return (event: APIGatewayProxyEvent, ctx: Context) => {
        proxy(server, event, ctx);
    };
};

export const lambdaHandler = awsServerlessKoa(app);