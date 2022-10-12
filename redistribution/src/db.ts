import pg from 'pg';
import { clientConfig } from "./dbConfig";

export const incrementShopCounter = async (body: string) => {
	const { shopId }: { shopId: number } = JSON.parse(body);
	const client = new pg.Client(clientConfig);
	await client.connect();
	const queryString = `UPDATE counter SET counter= counter + 1 WHERE shops = ${shopId}`;
	await client.query(queryString);
	await client.end();
}

export const shopCounterValidation = async (body: string): Promise<number> => {
	const { shopId }: { shopId: number } = JSON.parse(body);
	const client = new pg.Client(clientConfig);
	await client.connect();
	const queryString = `SELECT counter FROM counter WHERE shops = ${shopId}`;
	const result = await client.query(queryString);
	await client.end();
	return result.rows[0].counter;
}

export const writeUserReq = async (username: string, pwd: string, word: string, shopId: number) => {
	const client = new pg.Client(clientConfig);
	await client.connect();
	const queryString = `INSERT INTO usersreq(username, pwd, word, shopid) VALUES('${username}', '${pwd}', '${word}', ${shopId});`;
	await client.query(queryString);
	await client.end();
}
