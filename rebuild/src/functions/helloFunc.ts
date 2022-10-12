import { APIGatewayEvent, Handler } from 'aws-lambda';

export const helloName: Handler = async (event: APIGatewayEvent) => `Hello ${event.queryStringParameters?.name}!`;
