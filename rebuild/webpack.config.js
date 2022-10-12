"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const serverless_webpack_1 = __importDefault(require("serverless-webpack"));
const config = {
    target: 'node',
    mode: 'production',
    entry: serverless_webpack_1.default.lib.entries,
};
module.exports = config;
//# sourceMappingURL=webpack.config.js.map