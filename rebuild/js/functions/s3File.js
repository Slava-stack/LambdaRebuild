"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$delete = exports.getPics = exports.upload = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dynamo_1 = require("./dynamo");
aws_sdk_1.default.config.update({
    region: 'eu-central-1',
    accessKeyId: 'AKIASCFDHSLTT6YREOUB',
    secretAccessKey: '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',
});
const s3 = new aws_sdk_1.default.S3({ apiVersion: '2006-03-01', region: 'eu-central-1' });
const upload = (event) => __awaiter(void 0, void 0, void 0, function* () {
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
        const { name } = event.body[0];
        if (!name) {
            return 'Please enter name in the body request over json';
        }
        yield (0, dynamo_1.saveOne)(name, key);
        return s3.createPresignedPost(params);
    }
});
exports.upload = upload;
const getPics = (event) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.keys(event).includes('body') && Array.isArray(event.body)) {
        const { name } = event.body[0];
        const resp = { name, pics: [] };
        try {
            if (!name) {
                return 'Please enter your name and the key of the existing file which needs to be deleted.';
            }
            const result = yield (0, dynamo_1.fetchAll)(name);
            result.forEach((el) => __awaiter(void 0, void 0, void 0, function* () {
                resp.pics.push(yield s3.getSignedUrlPromise('getObject', {
                    Bucket: 'my-presigned-url-bucket',
                    Key: el,
                }));
            }));
        }
        catch (e) {
            return e;
        }
        return resp;
    }
});
exports.getPics = getPics;
const $delete = (event) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.keys(event).includes('body') && Array.isArray(event.body)) {
        const { name } = event.body[0];
        const { key } = event.body[0];
        if (!key && !name) {
            return 'Please enter your name and the key of the existing file which needs to be deleted.';
        }
        const params = {
            Bucket: 'my-presigned-url-bucket',
            Key: key,
        };
        yield s3.deleteObject(params).promise();
        yield (0, dynamo_1.deleteOneByKey)(name, key);
        return `Deleted ${key}`;
    }
});
exports.$delete = $delete;
//# sourceMappingURL=s3File.js.map