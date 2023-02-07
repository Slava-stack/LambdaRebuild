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
Object.defineProperty(exports, "__esModule", { value: true });
function getAverageCoinPrice(arrayOfCoinArrays) {
    return __awaiter(this, void 0, void 0, function* () {
        const averagePrice = {};
        const apis = {};
        arrayOfCoinArrays.forEach((el) => {
            if (el.status === "fulfilled") {
                el.value.forEach(({ symbol, price, api }) => {
                    const key = symbol;
                    const value = price;
                    const idApi = api;
                    if (key in averagePrice) {
                        averagePrice[key].push(value);
                    }
                    else {
                        averagePrice[key] = [value];
                    }
                    if (key in apis) {
                        apis[key] += ` ${idApi}`;
                    }
                    else {
                        apis[key] = idApi;
                    }
                });
            }
        });
        const dateTime = new Date(`${Date()} UTC`)
            .toISOString()
            .replace(/T/, " ")
            .replace(/:\d\d\....Z/, "");
        return Object.keys(averagePrice).map((el) => {
            const apiIds = apis[el];
            const values = Object.values(averagePrice[el]);
            const price = values.reduce((a, b) => a + b, 0) / values.length;
            return [el, price, dateTime, apiIds];
        });
    });
}
exports.default = getAverageCoinPrice;
