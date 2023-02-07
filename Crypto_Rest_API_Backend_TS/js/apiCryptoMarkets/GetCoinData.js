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
const GetCoins_1 = __importDefault(require("./GetCoins"));
class GetCoinData extends GetCoins_1.default {
    constructor() {
        super(...arguments);
        this.coinBaseCurrenciesUrl = "https://api.coinbase.com/v2/currencies";
    }
    getCoinMarketCapResponse() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.getApiResponse();
            const { data } = response.data;
            return data;
        });
    }
    getCoinMarketCapMappedValue() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getCoinMarketCapResponse();
            const coinMarketCapMapped = data.map((el) => ({
                symbol: el.symbol,
                price: el.quote.USD.price,
                api: "coinmarketcap",
            }));
            return coinMarketCapMapped;
        });
    }
    getCoinStatResponse() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.getApiResponse();
            const { coins } = response.data;
            return coins;
        });
    }
    getCoinStatMappedValue() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getCoinStatResponse();
            const coinStatsMapped = data.map((el) => ({
                symbol: el.symbol,
                price: el.price,
                api: "coinstats",
            }));
            return coinStatsMapped;
        });
    }
    getKuCoinResponse() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.getApiResponse();
            const { data } = response.data;
            return data;
        });
    }
    getKuCoinMappedValue() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getKuCoinResponse();
            const kuCoinMapped = Object.keys(data).map((el) => ({ symbol: el, price: +data[el], api: "kucoin" }));
            return kuCoinMapped;
        });
    }
    getCoinPapricaResponse() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.getApiResponse();
            const { data } = response;
            return data;
        });
    }
    getCoinPapricaMappedValue() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getCoinPapricaResponse();
            const coinPaprikaMapped = data.map((el) => ({
                symbol: el.symbol,
                price: el.quotes.USD.price,
                api: "coinpaprika",
            }));
            return coinPaprikaMapped;
        });
    }
    getCoinBaseCurrenciesResponse() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(this.coinBaseCurrenciesUrl);
            const { data } = response.data;
            return data;
        });
    }
    getCoinBaseExchangeResponse() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.getApiResponse();
            const { rates } = response.data.data;
            return rates;
        });
    }
    getCoinBaseMappedValue() {
        return __awaiter(this, void 0, void 0, function* () {
            const currencyResponse = yield this.getCoinBaseCurrenciesResponse();
            const currArray = currencyResponse.map((el) => el.id);
            const cryptoAndCurrenciesResp = yield this.getCoinBaseExchangeResponse();
            const dollar = 1;
            const coinBaseMapped = Object.keys(cryptoAndCurrenciesResp)
                .filter((el) => !currArray.includes(el))
                .map((el) => ({
                symbol: el,
                price: dollar / +cryptoAndCurrenciesResp[el],
                api: "coinbase",
            }));
            return coinBaseMapped;
        });
    }
}
exports.default = GetCoinData;
