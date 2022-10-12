'use strict';
import { writeUserReq } from './db';
import { Handler, SQSEvent } from 'aws-lambda';

export const handler: Handler = async (event: SQSEvent) => {
	const records: { receiptHandle: string, body: string }[] = event.Records // use map for array of messages
	const allDataToWrite: Promise<any>[] = [];
	for (const { body } of records) {
		const { name, pwd, word, shopId }: { name: string, pwd: string, word: string, shopId: number } = JSON.parse(body);
		allDataToWrite.push(writeUserReq(name, pwd, word, shopId));
	}
	await Promise.all(allDataToWrite);
};
