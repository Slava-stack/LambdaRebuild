"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const dotenv_1 = require("dotenv");
const node_cron_1 = __importDefault(require("node-cron"));
const axios_1 = __importDefault(require("axios"));
(0, dotenv_1.config)({ path: '.env' });
const everyFiveMinutes = '*/5 * * * *';
const PORT = process.env.PORT || 5000;
const tableName = 'Coin';
const tablesListQuery = 'SHOW tables';
const createTableQuery = `CREATE TABLE ${tableName} (`
  + 'id INT PRIMARY KEY AUTO_INCREMENT,'
  + 'coin_name VARCHAR(15) NOT NULL,'
  + 'average_price DECIMAL(38, 20) NOT NULL,'
  + 'dateTimeStamp DATETIME NOT NULL,'
  + 'markets VARCHAR(255))';
const insertQuery = `INSERT INTO ${tableName} (coin_name, average_price, dateTimeStamp, markets) VALUES ?`;
const app = (0, express_1.default)();
const pool = mysql_1.default.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});
app.use(express_1.default.json());
app.get('/', (req, res) => {
  const { coinName, market, timePeriodStart, timePeriodFinish, } = req.body;

  function getCoin(coinName = '', market = '', timePeriodStart = '', timePeriodFinish = '') {
    return __awaiter(this, void 0, void 0, function* () {
      pool.getConnection((err, con) => {
        if (err)
          res.send("error");
        else {
          const coinString = (coinName) ? `coin_name = "${coinName}"` : null;
          const allMarkets = ['coinmarketcap', 'coinbase', 'coinstats', 'kucoin', 'coinpaprika'];
          const marketString = (allMarkets.includes(market.toLowerCase())) ? `markets LIKE '%${market.toLowerCase()}%'` : null;
          const dateTimeString = (timePeriodStart && timePeriodFinish)
            ? `dateTimeStamp BETWEEN "${timePeriodStart}" AND "${timePeriodFinish}"` : null;
          const stringsElements = [coinString, marketString, dateTimeString];
          let strings = '';
          if (!(stringsElements.filter((el) => el === null).length === 3)) {
            strings += ' WHERE ';
            stringsElements.forEach((el) => {
              if (el) {
                strings += `${el} AND `;
              }
            });
            strings = strings.slice(0, -5);
          }
          const selectCoinQuery = `SELECT coin_name, average_price, dateTimeStamp, markets FROM ${tableName}${strings}`;
          con.query(selectCoinQuery, (err, result) => {
            if (err)
              console.log(err);
            const alteredResult = result.map((el) => ({
              coin_name: el.coin_name,
              average_price: el.average_price,
              dateTimeStamp: new Date(el.dateTimeStamp.toString()).toLocaleString(),
              // markets: el.markets,	// or markets: market,
            }));
            return res.send(JSON.stringify(alteredResult));
          });
          con.release();
        }
      });
    });
  }

  getCoin(coinName, market, timePeriodStart, timePeriodFinish);
});
const dbValidation = () => {
  pool.getConnection((err, con) => {
    if (err)
      console.log(err);
    else {
      con.query(tablesListQuery, (err, result) => {
        const allTables = result.map((el) => el.Tables_in_heroku_b8f41f7c25087ff); // need type from mysql db
        if (!allTables.includes(tableName.toLowerCase())) {
          con.query(createTableQuery, (er) => {
            if (er)
              console.error(er);
            console.warn(`No such table. So creating ${tableName} tables`);
          });
        }
      });
      con.release();
    }
  });
};
const coinMarket = () => __awaiter(void 0, void 0, void 0, function* () {
  const coinMarketCapRes = yield axios_1.default.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'
    + '?CMC_PRO_API_KEY=5a560a80-2d74-44b2-8cf6-0dc660627924&limit=50');
  const json = coinMarketCapRes.data;
  const coinMarketCapMapped = json.data.map((el) => ({
    symbol: el.symbol,
    price: el.quote.USD.price,
    api: 'coinmarketcap'
  }));
  return coinMarketCapMapped;
});
const coinBase = () => __awaiter(void 0, void 0, void 0, function* () {
  const res = yield axios_1.default.get('https://api.coinbase.com/v2/currencies');
  const currArray = res.data.data.map((el) => el.id);
  const coinBaseResp = yield axios_1.default.get('https://api.coinbase.com/v2/exchange-rates');
  const json = coinBaseResp.data;
  const coins = json.data.rates;
  const dollar = 1;
  const coinBaseMapped = Object.keys(coins)
    .filter((el) => !currArray.includes(el)).map((el) => ({ symbol: el, price: +dollar / coins[el], api: 'coinbase' }));
  return coinBaseMapped;
});
const coinStats = () => __awaiter(void 0, void 0, void 0, function* () {
  const coinStatsRes = yield axios_1.default.get('https://api.coinstats.app/public/v1/coins?limit=50&currency=USD');
  const json = coinStatsRes.data;
  const coinStatsMapped = json.coins.map((el) => ({ symbol: el.symbol, price: el.price, api: 'coinstats' }));
  return coinStatsMapped;
});
const kuCoin = () => __awaiter(void 0, void 0, void 0, function* () {
  const kuCoinResp = yield axios_1.default.get('https://api.kucoin.com/api/v1/prices');
  const json = kuCoinResp.data;
  const coins = json.data;
  const kuCoinMapped = Object.keys(coins).map((el) => ({ symbol: el, price: +coins[el], api: 'kucoin' }));
  return kuCoinMapped;
});
const coinPaprika = () => __awaiter(void 0, void 0, void 0, function* () {
  const coinPaprikaResp = yield axios_1.default.get('https://api.coinpaprika.com/v1/tickers?limit=50');
  const json = coinPaprikaResp.data;
  const coinPaprikaMapped = json.map((el) => ({ symbol: el.symbol, price: el.quotes.USD.price, api: 'coinpaprika' }));
  return coinPaprikaMapped;
});

function getAverageCoinPrice(arrayOfCoinArrays) {
  return __awaiter(this, void 0, void 0, function* () {
    const averagePrice = {};
    const apis = {};
    arrayOfCoinArrays.forEach((el) => {
      el.forEach((coin) => {
        const key = coin.symbol;
        const value = coin.price;
        const idApi = coin.api;
        if (key in averagePrice)
          averagePrice[key].push(value);
        else
          averagePrice[key] = [value];
        if (key in apis)
          apis[key] += ` ${idApi}`;
        else
          apis[key] = idApi;
      });
    });
    const dateTime = new Date(`${Date()} UTC`).toISOString().replace(/T/, ' ').replace(/:\d\d\....Z/, '');
    return Object.keys(averagePrice).map((el) => {
      const apiIds = apis[el];
      const values = Object.values(averagePrice[el]);
      const price = values.reduce((a, b) => a + b, 0) / values.length;
      return [el, price, dateTime, apiIds];
    });
  });
}

dbValidation();
node_cron_1.default.schedule(everyFiveMinutes, () => {
  (() => __awaiter(void 0, void 0, void 0, function* () {
    Promise.all([coinBase(), kuCoin(), coinPaprika(), coinStats(), coinMarket()])
      .then((results) => __awaiter(void 0, void 0, void 0, function* () {
        return getAverageCoinPrice(results);
      }))
      .then((coinArray) => {
        pool.getConnection((err, con) => {
          if (err)
            console.log(err);
          else {
            con.query(insertQuery, [coinArray], (err) => {
              if (err)
                console.error(err);
            });
          }
          con.release();
        });
      });
  }))();
});
app.listen(PORT, () => console.log("Server's been started"));
