import mongoose from 'mongoose';
import { model } from '../models/schema.js'

export async function getShort(linkToShorten) {
  await mongoose.connect('mongodb://0.0.0.0:27017/testing');
  await model.create({ fullUrl: linkToShorten });
  const row = await model.findOne({ fullUrl: linkToShorten });
  await mongoose.connection.close();
  return row.shortUrl;
}

export function isValid(urlString) {
  const validationRule = new RegExp(
    '^(([a-z]{0,5}://)(www\.)?([A-Za-z\\d]+)(\.[a-z]{2,15}))([A-Za-z\\d?=@&\.\/]+)*?$'
    // '(\b(https?|ftp|file):\/\/)[-A-Za-z0-9+&@#\/%?=~_|!:,.;]+[-A-Za-z0-9+&@#\/%=~_|]'
  );
  return validationRule.test(urlString);
}

export async function getFull(shortUrl) {
  await mongoose.connect('mongodb://0.0.0.0:27017/testing');
  const row = await model.findOne({ shortUrl });
  await mongoose.connection.close();
  return row?.fullUrl;
}
