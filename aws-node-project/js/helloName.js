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
const core_1 = __importDefault(require("@middy/core"));
const http_json_body_parser_1 = __importDefault(require("@middy/http-json-body-parser"));
const http_event_normalizer_1 = __importDefault(require("@middy/http-event-normalizer"));
const customMiddleware_1 = require("./middlewares/customMiddleware");
const rawHandler = (event) => __awaiter(void 0, void 0, void 0, function* () { var _a; return `Hello ${(_a = event.queryStringParameters) === null || _a === void 0 ? void 0 : _a.name}!`; });
exports.handler = (0, core_1.default)(rawHandler)
    .use((0, customMiddleware_1.ValidationMiddleWare)())
    .use((0, http_json_body_parser_1.default)())
    .use((0, http_event_normalizer_1.default)());
