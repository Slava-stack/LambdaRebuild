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
exports.ValidationMiddleWare = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const validation_1 = require("./validation");
function ValidationMiddleWare() {
    return {
        before: (handler) => __awaiter(this, void 0, void 0, function* () {
            const { error, value } = (0, validation_1.nameValidation)(handler.event.queryStringParameters);
            if (error)
                return boom_1.default.badRequest(`${error.details[0].message}`).output.payload.message;
            if (value === undefined)
                return boom_1.default.badRequest('no name parameter').output.payload.message;
        }),
    };
}
exports.ValidationMiddleWare = ValidationMiddleWare;
