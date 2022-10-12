"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const webpack_1 = require("webpack");
const serverless_webpack_1 = __importDefault(require("serverless-webpack"));
const config = {
    target: 'node',
    mode: 'production',
    entry: serverless_webpack_1.default.lib.entries,
    plugins: [new webpack_1.IgnorePlugin({ resourceRegExp: /^pg-native$/ })],
};
module.exports = config;
