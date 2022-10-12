process.env["NTBA_FIX_319"] = String(1);    // Needed to get rid of the issue
process.env["NTBA_FIX_350"] = String(1);    // Needed to get rid of the issue
import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import mysql from 'mysql';
import { token } from './secret';
// import dotenv from 'dotenv';

// dotenv.config({ path: '../.env' });

const tableFollowName = 'followList';
const tableFavoriteName = 'favoriteList';
const createFollowTableQuery = `CREATE TABLE ${tableFollowName} (`
	+ 'tg_id INT PRIMARY KEY, '
	+ 'coin_names VARCHAR(500) NOT NULL)';
const createFavoriteTableQuery = `CREATE TABLE ${tableFavoriteName} (`
	+ 'tg_id INT PRIMARY KEY, '
	+ 'coin_names VARCHAR(500) NOT NULL)';
const tablesListQuery = 'SHOW TABLES';
const buttons = {
	deletingButton: {
		reply_markup: {
			inline_keyboard: [[{
				text: 'Remove from following',
				callback_data: 'remove'
			}]]
		}
	},
	addingButton: {
		reply_markup: {
			inline_keyboard: [[{
				text: 'Add to following',
				callback_data: 'add'
			}]]
		}
	}
};
const pool = mysql.createPool({
	host: 'eu-cdbr-west-03.cleardb.net',
	user: 'b12fba28121ed1',
	password: '5c9614bb',
	database: 'heroku_dddc6a7287a423f',
});

type coinObj = { coin_name: string, average_price: number, dateTimeStamp: string, markets: string };

const bot = new TelegramBot(token, { polling: true });

const dbValidation = (tableName: string, createTableQuery: string) => {
	pool.getConnection((err, con) => {
		if (err) console.log(err);
		else {
			con.query(tablesListQuery, (err, result) => {
				const allTables = result.map((el: any) => el.Tables_in_heroku_dddc6a7287a423f);	//change it for the production
				if (!allTables.includes(tableName.toLowerCase())) {
					con.query(createTableQuery, (er) => {
						if (er) console.error(er);
						console.warn(`No such table. So creating ${tableName} table`);
					});
				}
			});
			con.release();
		}
	});
};
const userChecking = (chatId: number, tableName: string) => {
	pool.getConnection((err, con) => {
		if (err) console.log(err);
		con.query(`SELECT * FROM ${tableName} WHERE tg_id = ${chatId}`, (err, result) => {
			if (err) console.log(err);
			if (result == false)
				con.query(`INSERT INTO ${tableName} (tg_id, coin_names) VALUES (${chatId}, '')`, (err) => {
					if (err) console.log(err);
				});
		});
		con.release();
	});
}

dbValidation(tableFollowName, createFollowTableQuery);
dbValidation(tableFavoriteName, createFavoriteTableQuery);

bot.onText(/\/start/, (msg) => {
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, `Hello dear ${msg.chat.first_name}!`);
});

bot.onText(/\/help/, (msg) => {
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, '/listRecent - выводит список популярных валют.\n'
		+ '/{currency_symbol} - выводит подробную информацию о криптовалюте. Пример: /BTC, /ETH.\n'
		+ '/addToFavourite {currency_symbol} - добавить криптовалюту в избранное.\n'
		+ '/listFavourite - выводит список избранной криптовалюты.\n'
		+ '/deleteFavourite {currency_symbol} - удаляет криптовалюту из избранного.'
	);
});

bot.onText(/\/listRecent/, async (msg) => {
	const chatId = msg.chat.id;
	const { data } = await axios.get('https://crypto-rest-api-ts.herokuapp.com/');
	const time: string = data[data.length - 1].dateTimeStamp;
	let message = '';
	data.slice(-1000).filter((el: coinObj) => {
		if (el.dateTimeStamp === time && el.markets.includes('kucoin') && el.markets.includes('coinpaprika') &&
			el.markets.includes('coinbase') && el.markets.includes('coinstats') && el.markets.includes('coinmarketcap'))
			message += `/${el.coin_name} 	$${el.average_price}\n`
	});
	await bot.sendMessage(chatId, message);
});

bot.onText(/\/listFavorite/, async (msg) => {
	const chatId = msg.chat.id;
	const { data } = await axios.get('https://crypto-rest-api-ts.herokuapp.com/');
	userChecking(chatId, tableFavoriteName);
	pool.getConnection((err, con) => {
		if (err) console.log(err);
		con.query(`SELECT * FROM ${tableFavoriteName} WHERE tg_id = ${chatId}`, (err, result) => {
			if (err) console.log(err);
			const coins: string[] = result[0].coin_names.split(',');
			const time = data[data.length - 1].dateTimeStamp;
			const filteredCoins: coinObj[] = data.filter((el: coinObj) =>
				(coins.includes(el.coin_name) && el.dateTimeStamp === time));
			let stringMsg = '';
			filteredCoins.forEach((el) => stringMsg += `/${el.coin_name} $${el.average_price}\n`);
			if (stringMsg)				// added 10.08.2022
				bot.sendMessage(chatId, stringMsg);
		});
		con.release();
	});
});

bot.onText(/\/addToFavorite (.+)/, (msg, match) => {
	const chatId = msg.chat.id;
	userChecking(chatId, tableFavoriteName);
	if (match) {
		const resp = match[1].trim().toUpperCase();
		pool.getConnection((err, con) => {
			if (err) console.log(err);
			con.query(`SELECT * FROM ${tableFavoriteName} WHERE tg_id = ${chatId}`, (err, result) => {
				if (err) console.log(err);
				const coins: string[] = result[0]?.coin_names.split(',');
				if (!coins.includes(resp)) {
					coins.push(resp);
					let updatedString = coins.join(',');
					if (updatedString[0] === ',') updatedString = updatedString.slice(1);
					con.query(`UPDATE ${tableFavoriteName} SET coin_names = "${updatedString}" WHERE tg_id = ${chatId}`, (err) => {
						if (err) console.log(err);
					});
				}
			});
			con.release();
		});
	}
});

bot.onText(/\/deleteFavorite (.+)/, (msg, match) => {
	const chatId = msg.chat.id;
	userChecking(chatId, tableFavoriteName);
	if (match) {
		const resp = match[1].trim().toUpperCase();
		pool.getConnection((err, con) => {
			if (err) console.log(err);
			con.query(`SELECT * FROM ${tableFavoriteName} WHERE tg_id = ${chatId}`, (err, result) => {
				if (err) console.log(err);
				const coins: string[] = result[0]?.coin_names.split(',');
				if (coins) {
					const indexOfCoin = coins.indexOf(resp);
					if (indexOfCoin > -1) coins.splice(indexOfCoin, 1)
					const updatedString = coins.join(',');
					con.query(`UPDATE ${tableFavoriteName} SET coin_names = "${updatedString}" WHERE tg_id = ${chatId}`, (err) => {
						if (err) console.log(err);
					});
				}
			});
			con.release();
		});
	}
});

bot.onText(/\/(.+)/, async (msg, match) => {
	const chatId = msg.chat.id;
	userChecking(chatId, tableFollowName);
	if (match) {
		const resp = match[1].trim().toUpperCase();
		const { data } = await axios.get('https://crypto-rest-api-ts.herokuapp.com/', { data: { coinName: `${resp}` } });
		if (data.length) {
			const lastCoinData = data[data.length - 1];
			const lastCoinTime = Date.parse(lastCoinData.dateTimeStamp);
			const thirtyMinsAgo = lastCoinTime - 30 * 60 * 1000;
			const oneHourAgo = lastCoinTime - 3600 * 1000;
			const threeHoursAgo = lastCoinTime - 3 * 3600 * 1000;
			const sixHoursAgo = lastCoinTime - 6 * 3600 * 1000;
			const twelveHoursAgo = lastCoinTime - 12 * 3600 * 1000;
			const twentyFourHoursAgo = lastCoinTime - 24 * 3600 * 1000;
			const timesAgo = [thirtyMinsAgo, oneHourAgo, threeHoursAgo, sixHoursAgo, twelveHoursAgo, twentyFourHoursAgo];
			let sendString = ''
			data.forEach((el: coinObj) => {
				if (timesAgo.includes(Date.parse(el.dateTimeStamp)))
					sendString += `${el.coin_name} $${el.average_price} ${new Date(el.dateTimeStamp).toLocaleString()}\n`;
			});
			pool.getConnection((err, con) => {
				if (err) console.log(err);
				con.query(`SELECT * FROM ${tableFollowName} WHERE tg_id = ${chatId}`, (err, result) => {
					const coins: string[] = result[0]?.coin_names.split(',');
					if (coins.includes(resp)) {
						const indexOfCoin = coins.indexOf(resp);
						if (indexOfCoin > -1) coins.splice(indexOfCoin, 1);
						const updatedString = coins.join(',');
						bot.sendMessage(chatId, sendString, buttons.deletingButton);
						bot.on("callback_query", (callbackQuery) => {
							if (callbackQuery.data == 'remove') {
								con.query(`UPDATE ${tableFollowName} SET coin_names = "${updatedString}" WHERE tg_id = ${chatId}`, (err) => {
									if (err) console.log(err);
								});
							}
						});
					} else {
						coins.push(resp);
						let updatedResp = coins.join(',');
						if (updatedResp[0] === ',')
							updatedResp = updatedResp.slice(1)
						bot.sendMessage(chatId, sendString, buttons.addingButton);
						bot.on("callback_query", (callbackQuery) => {
							if (callbackQuery.data == 'add') {
								con.query(`UPDATE ${tableFollowName} SET coin_names = "${updatedResp}" WHERE tg_id = ${chatId}`, (err) => {
									if (err) console.log(err);
								});
							}
						});
					}
				});
				con.release();
			});
		}
	}
});
