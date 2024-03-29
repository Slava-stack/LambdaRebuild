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
exports.getSupplier = exports.getSuppliers = void 0;
const promise_1 = require("mysql2/promise");
const config_1 = __importDefault(require("./config/config"));
const queryTimeExecution_1 = __importDefault(require("./queryTimeExecution"));
const queries_1 = __importDefault(require("./queries/queries"));
function getSuppliers() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, promise_1.createConnection)(config_1.default);
        const { suppliersQuery } = queries_1.default;
        const output = yield (0, queryTimeExecution_1.default)(connection, suppliersQuery);
        yield connection.end();
        return {
            result: output.result,
            log: [
                {
                    query: suppliersQuery,
                    ts: new Date(),
                    duration: output.duration,
                },
            ],
            queries: 1,
            results: output.result.length,
            select: 1,
        };
    });
}
exports.getSuppliers = getSuppliers;
function getSupplier(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, promise_1.createConnection)(config_1.default);
        const { supplierQuery } = queries_1.default;
        const output = yield (0, queryTimeExecution_1.default)(connection, supplierQuery, [id]);
        yield connection.end();
        return {
            result: output.result[0],
            log: [{ query: supplierQuery, ts: new Date(), duration: output.duration }],
            queries: 1,
            results: output.result[0].length,
            selectWhere: 1,
        };
    });
}
exports.getSupplier = getSupplier;
