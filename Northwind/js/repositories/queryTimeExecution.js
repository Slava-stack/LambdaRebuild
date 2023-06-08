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
Object.defineProperty(exports, "__esModule", { value: true });
function queryTimeExecution(connection, query, args) {
    return __awaiter(this, void 0, void 0, function* () {
        if (args) {
            const start = new Date().getTime();
            const result = yield connection.query(query, args);
            const end = new Date().getTime();
            return { duration: end - start, result };
        }
        else {
            const start = new Date().getTime();
            const result = yield connection.query(query);
            const end = new Date().getTime();
            return { duration: end - start, result: result[0] };
        }
    });
}
exports.default = queryTimeExecution;