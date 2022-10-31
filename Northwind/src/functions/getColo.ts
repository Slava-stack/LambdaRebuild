import axios from 'axios';
import dotenv from 'dotenv';
import path from "path";

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export async function getColo(code: string) {
	const airports = `https://airlabs.co/api/v9/airports?api_key=${process.env.API_KEY_AIRLABS}&country_code=${code}`;
	const { data } = await axios.get(airports);
	const response = data.response;
	return response[0]?.iata_code;
}
