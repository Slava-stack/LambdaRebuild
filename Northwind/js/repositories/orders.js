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
exports.getOrder = exports.getOrders = void 0;
const promise_1 = require("mysql2/promise");
const config_1 = __importDefault(require("./config/config"));
const queryTimeExecution_1 = __importDefault(require("./queryTimeExecution"));
const queries_1 = __importDefault(require("./queries/queries"));
function getOrders() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, promise_1.createConnection)(config_1.default);
        const { ordersQuery } = queries_1.default;
        const output = yield (0, queryTimeExecution_1.default)(connection, ordersQuery);
        yield connection.end();
        return {
            result: output.result,
            log: [{ query: ordersQuery, ts: new Date(), duration: output.duration }],
            queries: 1,
            results: output.result.length,
            selectLeftJoin: 1,
        };
    });
}
exports.getOrders = getOrders;
function getOrder(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, promise_1.createConnection)(config_1.default);
        const { orderQuery1 } = queries_1.default;
        const output1 = yield (0, queryTimeExecution_1.default)(connection, orderQuery1, [id]);
        const { orderQuery2 } = queries_1.default;
        const output2 = yield (0, queryTimeExecution_1.default)(connection, orderQuery2, [id]);
        yield connection.end();
        return {
            result: {
                OrderInformation: output1.result[0],
                ProductsInOrder: output2.result[0],
            },
            log: [
                { query: orderQuery1, ts: new Date(), duration: output1.duration },
                { query: orderQuery2, ts: new Date(), duration: output2.duration },
            ],
            queries: 2,
            results: output1.result[0].length + output2.result[0].length,
            selectLeftJoinWhere: 3,
        };
    });
}
exports.getOrder = getOrder;
