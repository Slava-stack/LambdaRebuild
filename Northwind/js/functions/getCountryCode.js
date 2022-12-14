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
exports.getCountryCode = void 0;
const promises_1 = __importDefault(require("fs/promises"));
function getCountryCode(ip) {
    return __awaiter(this, void 0, void 0, function* () {
        const decIp = ipToDecIp(ip);
        const data = yield promises_1.default.readFile('./IP2LOCATION-LITE-DB1.CSV', 'utf8');
        return findIpRowAccordingDecIp(data, decIp);
    });
}
exports.getCountryCode = getCountryCode;
function ipToDecIp(ip) {
    const octetArr = [];
    ip.split('.').forEach((el) => {
        octetArr.push('0'.repeat(8 - (+el).toString(2).length) + (+el).toString(2));
    });
    return parseInt(octetArr.join(''), 2);
}
function findIpRowAccordingDecIp(rows, decIp) {
    for (let el of rows.toString().split('\n')) {
        const ipRangeRegardingCountry = el.split(',');
        if (decIp >= +ipRangeRegardingCountry[0] && decIp <= +ipRangeRegardingCountry[1]) {
            return ipRangeRegardingCountry[2];
        }
    }
}
