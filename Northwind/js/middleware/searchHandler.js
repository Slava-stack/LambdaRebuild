"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchHandler = void 0;
const errorMessages_1 = __importDefault(require("./data/errorMessages"));
const searchHandler = (req, res, next) => {
    const { type, searchWord } = req.params;
    if (!type) {
        res.status(404).json({ message: errorMessages_1.default.searchTypeMsg });
        return;
    }
    const isValidParam = ["Products", "Customers"].includes(type);
    if (!isValidParam) {
        res.status(404).json({ message: errorMessages_1.default.searchPathMsg });
        return;
    }
    next();
};
exports.searchHandler = searchHandler;
