"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const serverless_webpack_1 = __importDefault(require("serverless-webpack"));
const config = {
    target: 'node',
    mode: 'production',
    // entry: './js/helloName.js',
    entry: serverless_webpack_1.default.lib.entries,
    // devtool: 'source-map',
    // output: {
    // 	path: path.resolve(__dirname, 'bundle'),
    // 	filename: 'bundle.js',
    // },
};
module.exports = config;
