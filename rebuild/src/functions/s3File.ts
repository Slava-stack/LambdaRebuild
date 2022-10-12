import AWS from 'aws-sdk';
import { APIGatewayEvent, Handler } from 'aws-lambda';
import { deleteOneByKey, saveOne, fetchAll } from './dynamo';
import { accessKeyIdS3, secretAccessKeyS3 } from './AWSsecret';

AWS.config.update({
	region: 'eu-central-1',
	accessKeyId: accessKeyIdS3,
	secretAccessKey: secretAccessKeyS3,
});

const s3 = new AWS.S3({ apiVersion: '2006-03-01', region: 'eu-central-1' });

interface Name {
	name: string
}

export const upload: Handler = async (event: APIGatewayEvent) => {
	const key = `${new Date().valueOf().toString()}.jpg`;
	const params = {
		Bucket: 'my-presigned-url-bucket',
		Conditions: [
			{ bucket: 'my-presigned-url-bucket' },
			['content-length-range', 0, 10000000],
		],
		Fields: {
			key,
		},
	};
	if (Object.keys(event).includes('body') && Array.isArray(event.body)) {
		const { name }: Name = event.body[0];
		if (!name) {
			return 'Please enter name in the body request over json';
		}
		await saveOne(name, key);
		return s3.createPresignedPost(params);
	}
};

export const getPics: Handler = async (event: APIGatewayEvent) => {
	if (Object.keys(event).includes('body') && Array.isArray(event.body)) {
		const { name }: Name = event.body[0];
		const resp: { name: string, pics: string[] } = { name, pics: [] };
		try {
			if (!name) {
				return 'Please enter your name and the key of the existing file which needs to be deleted.';
			}
			const result = await fetchAll(name);
			result.forEach(async (el) => {
				resp.pics.push(
					await s3.getSignedUrlPromise('getObject', {
						Bucket: 'my-presigned-url-bucket',
						Key: el,
					}),
				);
			});
			// for (const el of result) {
			// 	const url = await s3.getSignedUrlPromise('getObject', {
			// 		Bucket: 'my-presigned-url-bucket',
			// 		Key: el,
			// 	});
			// 	resp.pics.push(url);
			// }
		} catch (e) {
			return e;
		}
		return resp;
	}
};

export const $delete: Handler = async (event: APIGatewayEvent) => {
	if (Object.keys(event).includes('body') && Array.isArray(event.body)) {
		const { name }: Name = event.body[0];
		const { key }: { key: string } = event.body[0];
		if (!key && !name) {
			return 'Please enter your name and the key of the existing file which needs to be deleted.';
		}
		const params = {
			Bucket: 'my-presigned-url-bucket',
			Key: key,
		};
		await s3.deleteObject(params).promise();
		await deleteOneByKey(name, key);
		return `Deleted ${key}`;
	}
};
