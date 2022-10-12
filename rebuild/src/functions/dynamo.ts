import AWS from 'aws-sdk';
import { accessKeyIdDynamo, secretAccessKeyDynamo } from './AWSsecret';

AWS.config.update({
	region: 'eu-central-1',
	accessKeyId: accessKeyIdDynamo,
	secretAccessKey: secretAccessKeyDynamo,
});

const docClient = new AWS.DynamoDB.DocumentClient();

export const fetchAll = async (userName: string) => {
	const params = {
		TableName: 'userPics',
		FilterExpression: '#userName = :userName',
		ExpressionAttributeNames: { '#userName': 'userName' },
		ExpressionAttributeValues: { ':userName': `${userName}` },
	};
	const keys: string[] = [];
	const data: any = await docClient.scan(params).promise();
	data.Items.forEach((el: { link: string }) => keys.push(el.link));
	return keys;
};

export const saveOne = async (userName: string, key: string) => {
	const input = {
		link: key,
		userName,
	};
	const params = {
		TableName: 'userPics',
		Item: input,
	};
	await docClient.put(params).promise();
};

export const deleteOneByKey = async (userName: string, link: string) => {
	const params = {
		TableName: 'userPics',
		Key: { userName, link },
	};
	await docClient.delete(params).promise();
};
