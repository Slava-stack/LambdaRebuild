import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';
import { Handler } from 'aws-lambda';
import { ValidationMiddleWare } from './middlewares/customMiddleware';
import { helloName } from './functions/helloFunc';
import { upload, $delete, getPics } from './functions/s3File';

export const handler: Handler = middy(helloName)
	.use(ValidationMiddleWare())
	.use(jsonBodyParser())
	.use(httpEventNormalizer());

export const linkToUpload: Handler = middy(upload)
	.use(jsonBodyParser());

export const eraseLink: Handler = middy($delete)
	.use(jsonBodyParser());

export const getPicLinks: Handler = middy(getPics)
	.use(jsonBodyParser());
