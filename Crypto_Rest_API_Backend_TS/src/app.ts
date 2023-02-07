import express, { Application } from "express";
import { config } from "dotenv";
import cron from "node-cron";
import sendCoin from "./db/sendResponse/sendCoin";
import dbValidation from "./db/dbValidation";
import getAverageCoinPrice from "./utils/getAvrgCoinPrice";
import writeCoinsToDB from "./db/writeData";
import GetCoinData from "./apiCryptoMarkets/GetCoinData";

import { getCoinInterface } from "./interfaces/types";

// config({ path: "../.env" }); // for heroku
config({ path: "./.env" }); // for local machine

const everyFiveMinutes = "*/5 * * * *";
const PORT = process.env.PORT || 5000;

const coinMarket = new GetCoinData(
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest" +
    "?CMC_PRO_API_KEY=5a560a80-2d74-44b2-8cf6-0dc660627924&limit=50"
).getCoinMarketCapMappedValue();

const coinStats = new GetCoinData(
  "https://api.coinstats.app/public/v1/coins?limit=50&currency=USD"
).getCoinStatMappedValue();

const kuCoin = new GetCoinData(
  "https://api.kucoin.com/api/v1/prices"
).getKuCoinMappedValue();

const coinPaprika = new GetCoinData(
  "https://api.coinpaprika.com/v1/tickers?limit=50"
).getCoinPapricaMappedValue();

const coinBase = new GetCoinData(
  "https://api.coinbase.com/v2/exchange-rates"
).getCoinBaseMappedValue();

const app: Application = express();

app.use(express.json());
app.use((req, res, next) => {
  const {
    coinName = "",
    market = "",
    timePeriodStart = "",
    timePeriodFinish = "",
  }: getCoinInterface = req.body;

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

  sendCoin(res, params);
});

dbValidation();

cron.schedule(everyFiveMinutes, () => {
  (async () => {
    Promise.allSettled([coinBase, coinStats, kuCoin, coinPaprika, coinMarket])
      .then(async (results) => getAverageCoinPrice(results))
      .then((coinArray) => writeCoinsToDB(coinArray));
  })();
});

app.listen(PORT, () => console.log("Server's been started"));
