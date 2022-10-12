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
exports.deleteOneByKey = exports.saveOne = exports.fetchAll = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
aws_sdk_1.default.config.update({
    region: 'eu-central-1',
    accessKeyId: 'AKIASCFDHSLT5R57467V',
    secretAccessKey: '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',
});
const docClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
const fetchAll = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        TableName: 'userPics',
        FilterExpression: '#userName = :userName',
        ExpressionAttributeNames: { '#userName': 'userName' },
        ExpressionAttributeValues: { ':userName': `${userName}` },
    };
    const keys = [];
    const data = yield docClient.scan(params).promise();
    data.Items.forEach((el) => keys.push(el.link));
    return keys;
});
exports.fetchAll = fetchAll;
const saveOne = (userName, key) => __awaiter(void 0, void 0, void 0, function* () {
    const input = {
        link: key,
        userName,
    };
    const params = {
        TableName: 'userPics',
        Item: input,
    };
    yield docClient.put(params).promise();
});
exports.saveOne = saveOne;
const deleteOneByKey = (userName, link) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        TableName: 'userPics',
        Key: { userName, link },
    };
    yield docClient.delete(params).promise();
});
exports.deleteOneByKey = deleteOneByKey;
//# sourceMappingURL=dynamo.js.map