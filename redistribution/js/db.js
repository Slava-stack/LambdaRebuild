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
exports.writeUserReq = exports.shopCounterValidation = exports.incrementShopCounter = void 0;
const pg_1 = __importDefault(require("pg"));
const clientConfig = {
    host: 'database-1.chr8eoo3f01q.eu-central-1.rds.amazonaws.com',
    user: 'postgres',
    password: 'postgrespostgres',
    port: 5432,
    database: 'requests',
};
const incrementShopCounter = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { shopId } = JSON.parse(body);
    const client = new pg_1.default.Client(clientConfig);
    yield client.connect();
    const queryString = `UPDATE counter SET counter= counter + 1 WHERE shops = ${shopId}`;
    yield client.query(queryString);
    yield client.end();
});
exports.incrementShopCounter = incrementShopCounter;
const shopCounterValidation = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { shopId } = JSON.parse(body);
    const client = new pg_1.default.Client(clientConfig);
    yield client.connect();
    const queryString = `SELECT counter FROM counter WHERE shops = ${shopId}`;
    const result = yield client.query(queryString);
    yield client.end();
    return result.rows[0].counter;
});
exports.shopCounterValidation = shopCounterValidation;
const writeUserReq = (username, pwd, word, shopId) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new pg_1.default.Client(clientConfig);
    yield client.connect();
    const queryString = `INSERT INTO usersreq(username, pwd, word, shopid) VALUES('${username}', '${pwd}', '${word}', ${shopId});`;
    yield client.query(queryString);
    yield client.end();
});
exports.writeUserReq = writeUserReq;
