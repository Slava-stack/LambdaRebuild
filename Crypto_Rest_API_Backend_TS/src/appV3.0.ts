import express, { Application } from 'express';
import mysql from 'mysql';
import { config } from 'dotenv';
import cron from 'node-cron';
import axios, { AxiosResponse } from 'axios';

config({ path: '../.env' });

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
const app: Application = express();

const pool = mysql.createPool({
	host: process.env.host,
	user: process.env.user,
	password: process.env.password,
	database: process.env.database,
});

type filteredResult = {
	coin_name: string,
	average_price: number,
	dateTimeStamp: string,
	markets?: string
};
type symbolAndPrice = { symbol: string, price: number };
type coinMarketResponse = { data: { symbol: string, quote: { USD: { price: number } } }[] };
type symbolPriceApi = { symbol: string, price: number, api: string };

app.use(express.json());

app.get('/', (req, res) => {
	const {
		coinName,
		market,
		timePeriodStart,
		timePeriodFinish,
	} = req.body;

	async function getCoin(
		coinName: string = '',
		market: string = '',
		timePeriodStart: string = '',
		timePeriodFinish: string = '',
	) {
		pool.getConnection((err, con) => {
			if (err) res.send('error');
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
				con.query(selectCoinQuery, (err: string, result: filteredResult[]) => {
					if (err) console.log(err);
					const alteredResult: filteredResult[] = result.map((el: filteredResult) => ({
						coin_name: el.coin_name,
						average_price: el.average_price,
						dateTimeStamp: new Date(el.dateTimeStamp.toString()).toLocaleString(),
						markets: el.markets,	// or markets: market,
					}));
					return res.send(JSON.stringify(alteredResult));
				});
				con.release();
			}
		});
	}

	getCoin(coinName, market, timePeriodStart, timePeriodFinish);
});

const dbValidation = () => {
	pool.getConnection((err, con) => {
		if (err) console.log(err);
		else {
			con.query(tablesListQuery, (err, result) => {
				const allTables = result.map((el: any) => el.Tables_in_heroku_b8f41f7c25087ff);
				if (!allTables.includes(tableName.toLowerCase())) {
					con.query(createTableQuery, (er) => {
						if (er) console.error(er);
						console.warn(`No such table. So creating ${tableName} tables`);
					});
				}
			});
			con.release();
		}
	});
};
const coinMarket = async () => {
	const coinMarketCapRes: AxiosResponse = await axios.get(
		'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'
		+ '?CMC_PRO_API_KEY=5a560a80-2d74-44b2-8cf6-0dc660627924&limit=50',
	);
	const json: coinMarketResponse = coinMarketCapRes.data;
	const coinMarketCapMapped: symbolPriceApi[] = json.data.map((el: {
		symbol: string, quote:
			{ USD: { price: number } }
	}): symbolPriceApi => ({ symbol: el.symbol, price: el.quote.USD.price, api: 'coinmarketcap' }));
	return coinMarketCapMapped;
};
const coinBase = async () => {
	const res = await axios.get('https://api.coinbase.com/v2/currencies');
	const currArray: string[] = res.data.data.map((el: { id: string, name: string, 'min_size': string }) => el.id);
	const coinBaseResp = await axios.get('https://api.coinbase.com/v2/exchange-rates');
	const json = coinBaseResp.data;
	const coins = json.data.rates;
	const dollar = 1;
	const coinBaseMapped: symbolPriceApi[] = Object.keys(coins)
		.filter((el) => !currArray.includes(el)).map((el):
		symbolPriceApi => ({ symbol: el, price: +dollar / coins[el], api: 'coinbase' }));
	return coinBaseMapped;
};
const coinStats = async () => {
	const coinStatsRes: AxiosResponse = await axios.get(
		'https://api.coinstats.app/public/v1/coins?limit=50&currency=USD',
	);
	const json: { coins: symbolAndPrice[] } = coinStatsRes.data;
	const coinStatsMapped: symbolPriceApi[] = json.coins.map((el: symbolAndPrice):
	symbolPriceApi => ({ symbol: el.symbol, price: el.price, api: 'coinstats' }));
	return coinStatsMapped;
};
const kuCoin = async () => {
	const kuCoinResp: AxiosResponse = await axios.get('https://api.kucoin.com/api/v1/prices');
	const json = kuCoinResp.data;
	const coins = json.data;
	const kuCoinMapped: symbolPriceApi[] = Object.keys(coins).map((el):
	symbolPriceApi => ({ symbol: el, price: +coins[el], api: 'kucoin' }));
	return kuCoinMapped;
};
const coinPaprika = async () => {
	const coinPaprikaResp: AxiosResponse = await axios.get('https://api.coinpaprika.com/v1/tickers?limit=50');
	const json: { symbol: string, quotes: { USD: { price: number } } }[] = coinPaprikaResp.data;
	const coinPaprikaMapped: symbolPriceApi[] = json.map(
		(el: { symbol: string, quotes: { USD: { price: number } } }):
		symbolPriceApi => ({ symbol: el.symbol, price: el.quotes.USD.price, api: 'coinpaprika' }),
	);
	return coinPaprikaMapped;
};

async function getAverageCoinPrice(arrayOfCoinArrays: symbolPriceApi[][]) {
	const averagePrice: { [symbol: string]: number[] } = {};
	const apis: { [symbol: string]: string } = {};
	arrayOfCoinArrays.forEach((el) => {
		el.forEach((coin) => {
			const key = coin.symbol;
			const value = coin.price;
			const idApi = coin.api;
			if (key in averagePrice) averagePrice[key].push(value);
			else averagePrice[key] = [value];
			if (key in apis) apis[key] += ` ${idApi}`;
			else apis[key] = idApi;
		});
	});
	const dateTime = new Date(`${Date()} UTC`).toISOString().replace(/T/, ' ').replace(/:\d\d\....Z/, '');
	return Object.keys(averagePrice).map((el) => {
		const apiIds: string = apis[el];
		const values: number[] = Object.values(averagePrice[el]);
		const price = values.reduce((a: number, b: number) => a + b, 0) / values.length;
		return [el, price, dateTime, apiIds];
	});
}

dbValidation();

cron.schedule(everyFiveMinutes, () => {
	(async () => {
		Promise.all([coinBase(), kuCoin(), coinPaprika(), coinStats(), coinMarket()])
			.then(async (results) => getAverageCoinPrice(results))
			.then((coinArray) => {
				pool.getConnection((err, con) => {
					if (err) console.log(err);
					else {
						con.query(insertQuery, [coinArray], (err) => {
							if (err) console.error(err);
						});
					}
					con.release();
				});
			});
	})();
});

app.listen(PORT, () => console.log("Server's been started"));
