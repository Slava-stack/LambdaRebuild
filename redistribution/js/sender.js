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
exports.handler = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const functions_1 = require("./functions");
const db_1 = require("./db");
aws_sdk_1.default.config.update({ region: 'eu-central-1' });
const sqs = new aws_sdk_1.default.SQS({ apiVersion: '2012-11-05' });
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = event;
    if (body) {
        if ((0, functions_1.bodyValidation)(body)) {
            if ((yield (0, db_1.shopCounterValidation)(body)) < 200) {
                const params = { MessageBody: body, QueueUrl: 'https://sqs.eu-central-1.amazonaws.com/142076252903/MyQueue', };
                const result = yield sqs.sendMessage(params).promise();
                yield (0, db_1.incrementShopCounter)(body);
                return `Sent! ${JSON.stringify(result)}`;
            }
        }
    }
    return JSON.stringify({ statusCode: 422, messageBody: `Not valid input!` });
});
exports.handler = handler;
