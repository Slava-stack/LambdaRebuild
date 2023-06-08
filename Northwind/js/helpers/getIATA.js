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
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../.env") });
function getIATA(code) {
    return __awaiter(this, void 0, void 0, function* () {
        const airportsAPI = `https://airlabs.co/api/v9/airports?api_key=${process.env.API_KEY_AIRLABS}&country_code=${code}`;
        const { data } = yield axios_1.default.get(airportsAPI);
        const [airport] = data.response;
        if (airport) {
            const { iata_code } = airport;
            return iata_code;
        }
        return "no closest airport code";
    });
}
exports.default = getIATA;
