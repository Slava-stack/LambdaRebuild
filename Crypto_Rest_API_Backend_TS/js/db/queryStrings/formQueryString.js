"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbQueryStrings_1 = __importDefault(require("./dbQueryStrings"));
const { defineTimePeriod, marketsLike } = dbQueryStrings_1.default;
function formQueryString(params) {
    const { coinName, market, timePeriodStart, timePeriodFinish } = params;
    const coinString = coinName ? `coin_name = "${coinName}"` : null;
    const allMarkets = [
        "coinmarketcap",
        "coinbase",
        "coinstats",
        "kucoin",
        "coinpaprika",
    ];
    const marketString = allMarkets.includes(market.toLowerCase())
        ? marketsLike(market)
        : null;
    const dateTimeString = timePeriodStart && timePeriodFinish
        ? defineTimePeriod(timePeriodStart, timePeriodFinish)
        : null;
    const stringsElements = [coinString, marketString, dateTimeString];
    let strings = "";
    const isValidQueryElements = stringsElements.filter((el) => el === null).length === 3;
    if (!isValidQueryElements) {
        strings += " WHERE ";
        stringsElements.forEach((el) => {
            if (el) {
                strings += `${el} AND `;
            }
        });
        strings = strings.slice(0, -5);
    }
    return strings;
}
exports.default = formQueryString;
