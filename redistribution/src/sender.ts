import AWS from 'aws-sdk';
import { Handler, APIGatewayEvent } from 'aws-lambda';
import { bodyValidation } from "./functions";
import { shopCounterValidation, incrementShopCounter } from "./db";

AWS.config.update({ region: 'eu-central-1' });
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

export const handler: Handler = async (event: APIGatewayEvent) => {
	const { body } = event;
	if (body) {
		if (bodyValidation(body)) {
			if (await shopCounterValidation(body) < 200) {
				const params = { MessageBody: body, QueueUrl: 'https://sqs.eu-central-1.amazonaws.com/142076252903/MyQueue', };
				const result = await sqs.sendMessage(params).promise();
				await incrementShopCounter(body);
				return `Sent! ${JSON.stringify(result)}`;
			}
			return `I've excited the shop request limit`;
		}
	}
	return JSON.stringify({ statusCode: 422, messageBody: `Not valid input!` });
}
