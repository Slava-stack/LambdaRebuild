import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';
import { ValidationMiddleWare } from './middlewares/customMiddleware';

const rawHandler = async (event: any) => `Hello ${event.queryStringParameters?.name}!`;

export const handler = middy(rawHandler)
	.use(ValidationMiddleWare())
	.use(jsonBodyParser())
	.use(httpEventNormalizer());
