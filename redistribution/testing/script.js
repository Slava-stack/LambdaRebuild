import http from 'k6/http';
import { sleep } from 'k6';
import { randomShop, name, email, word } from "./randParams.js";

export const options = { vus: 300, duration: '3s', };

export default function () {
  const data = JSON.stringify({ name, pwd: email, shopId: randomShop, word });
  const params = { headers: { 'Content-Type': 'application/json' } };
  http.post('https://aozuja5g4f.execute-api.eu-central-1.amazonaws.com/', data, params)
  sleep(3);
}
