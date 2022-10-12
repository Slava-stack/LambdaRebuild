"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nameValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const paramSchema = joi_1.default.object({
    name: joi_1.default.string().required().trim(),
});
const Validation = (schema) => (data) => schema.validate(data);
exports.nameValidation = Validation(paramSchema);
