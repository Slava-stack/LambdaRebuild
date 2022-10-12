import Joi from 'joi';

const paramSchema = Joi.object({
	name: Joi.string().required().trim(),
});

const Validation = (schema: any) => (data: {
	name?: string }) => schema.validate(data);

export const nameValidation = Validation(paramSchema);
