"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (_err, _req, res, _next) => {
    console.log(_err);
    res.json({ status: 500, message: "internal error" });
};
exports.default = errorHandler;
