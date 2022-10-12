import mongoose from 'mongoose';
import shortId from 'shortid';

const urlSchema = new mongoose.Schema({
  fullUrl: {
    type: String, required: true,
  }, shortUrl: {
    type: String, required: true, default: shortId.generate,
  },
});

export const model = mongoose.model('urlSchema', urlSchema)
