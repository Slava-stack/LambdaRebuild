import Boom from '@hapi/boom';
import { nameValidation } from './validation';

export function ValidationMiddleWare() {
	return {
		before: async (handler: { event: { queryStringParameters: { name: string } } }) => {
			const { error, value }: {
				error: { details: { message: string }[] }, value: { name: string }
			} = nameValidation(handler.event.queryStringParameters);
			if (error) return Boom.badRequest(`${error.details[0].message}`).output.payload.message;
			if (value === undefined) return Boom.badRequest('no name parameter').output.payload.message;
		},
	};
}
