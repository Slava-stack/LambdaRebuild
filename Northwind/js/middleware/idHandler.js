"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.idHandler = void 0;
const errorMessages_1 = __importDefault(require("./data/errorMessages"));
const idHandler = (req, res, next) => {
    const { id } = req.params;
    if (typeof id === "string") {
        if (id.trim()) {
            next();
            return;
        }
    }
    res.status(404).json({ message: errorMessages_1.default.idMsg });
};
exports.idHandler = idHandler;
