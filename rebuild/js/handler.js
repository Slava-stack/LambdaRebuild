"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPicLinks = exports.eraseLink = exports.linkToUpload = exports.handler = void 0;
const core_1 = __importDefault(require("@middy/core"));
const http_json_body_parser_1 = __importDefault(require("@middy/http-json-body-parser"));
const http_event_normalizer_1 = __importDefault(require("@middy/http-event-normalizer"));
const customMiddleware_1 = require("./middlewares/customMiddleware");
const helloFunc_1 = require("./functions/helloFunc");
const s3File_1 = require("./functions/s3File");
exports.handler = (0, core_1.default)(helloFunc_1.helloName)
    .use((0, customMiddleware_1.ValidationMiddleWare)())
    .use((0, http_json_body_parser_1.default)())
    .use((0, http_event_normalizer_1.default)());
exports.linkToUpload = (0, core_1.default)(s3File_1.upload)
    .use((0, http_json_body_parser_1.default)());
exports.eraseLink = (0, core_1.default)(s3File_1.$delete)
    .use((0, http_json_body_parser_1.default)());
exports.getPicLinks = (0, core_1.default)(s3File_1.getPics)
    .use((0, http_json_body_parser_1.default)());
//# sourceMappingURL=handler.js.map