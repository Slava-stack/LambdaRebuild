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
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const node_cron_1 = __importDefault(require("node-cron"));
const sendCoin_1 = __importDefault(require("./db/sendResponse/sendCoin"));
const dbValidation_1 = __importDefault(require("./db/dbValidation"));
const getAvrgCoinPrice_1 = __importDefault(require("./utils/getAvrgCoinPrice"));
const writeData_1 = __importDefault(require("./db/writeData"));
const GetCoinData_1 = __importDefault(require("./apiCryptoMarkets/GetCoinData"));
// config({ path: "../.env" }); // for heroku
(0, dotenv_1.config)({ path: "./.env" }); // for local machine
const everyFiveMinutes = "*/5 * * * *";
const PORT = process.env.PORT || 5000;
const coinMarket = new GetCoinData_1.default("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest" +
    "?CMC_PRO_API_KEY=5a560a80-2d74-44b2-8cf6-0dc660627924&limit=50").getCoinMarketCapMappedValue();
const coinStats = new GetCoinData_1.default("https://api.coinstats.app/public/v1/coins?limit=50&currency=USD").getCoinStatMappedValue();
const kuCoin = new GetCoinData_1.default("https://api.kucoin.com/api/v1/prices").getKuCoinMappedValue();
const coinPaprika = new GetCoinData_1.default("https://api.coinpaprika.com/v1/tickers?limit=50").getCoinPapricaMappedValue();
const coinBase = new GetCoinData_1.default("https://api.coinbase.com/v2/exchange-rates").getCoinBaseMappedValue();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((req, res, next) => {
    const { coinName = "", market = "", timePeriodStart = "", timePeriodFinish = "", } = req.body;
    req.body = {
        coinName,
        market,
        timePeriodStart,
        timePeriodFinish,
    };
    next();
});
app.get("/", (req, res) => {
    const { coinName, market, timePeriodStart, timePeriodFinish } = req.body;
    const params = { coinName, market, timePeriodStart, timePeriodFinish };
    (0, sendCoin_1.default)(res, params);
});
(0, dbValidation_1.default)();
node_cron_1.default.schedule(everyFiveMinutes, () => {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        Promise.allSettled([coinBase, coinStats, kuCoin, coinPaprika, coinMarket])
            .then((results) => __awaiter(void 0, void 0, void 0, function* () { return (0, getAvrgCoinPrice_1.default)(results); }))
            .then((coinArray) => (0, writeData_1.default)(coinArray));
    }))();
});
app.listen(PORT, () => console.log("Server's been started"));
