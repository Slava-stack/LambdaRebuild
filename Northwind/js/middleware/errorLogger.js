"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, _req, _res, next) => {
    console.log(err);
    next(err);
};
exports.default = errorHandler;
