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
process.env["NTBA_FIX_319"] = String(1); // Needed to get rid of the issue
process.env["NTBA_FIX_350"] = String(1); // Needed to get rid of the issue
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const axios_1 = __importDefault(require("axios"));
const mysql_1 = __importDefault(require("mysql"));
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
const pool = mysql_1.default.createPool({
    host: 'eu-cdbr-west-03.cleardb.net',
    user: 'b12fba28121ed1',
    password: '5c9614bb',
    database: 'heroku_dddc6a7287a423f',
});
const token = '5554479728:AAE8dex7H0ga-ecT-PjyNVo4bwVuwCo7ovw';
const bot = new node_telegram_bot_api_1.default(token, { polling: true });
const dbValidation = (tableName, createTableQuery) => {
    pool.getConnection((err, con) => {
        if (err)
            console.log(err);
        else {
            con.query(tablesListQuery, (err, result) => {
                const allTables = result.map((el) => el.Tables_in_heroku_dddc6a7287a423f); //change it for the production
                if (!allTables.includes(tableName.toLowerCase())) {
                    con.query(createTableQuery, (er) => {
                        if (er)
                            console.error(er);
                        console.warn(`No such table. So creating ${tableName} table`);
                    });
                }
            });
            con.release();
        }
    });
};
const userChecking = (chatId, tableName) => {
    pool.getConnection((err, con) => {
        if (err)
            console.log(err);
        con.query(`SELECT * FROM ${tableName} WHERE tg_id = ${chatId}`, (err, result) => {
            if (err)
                console.log(err);
            if (result == false)
                con.query(`INSERT INTO ${tableName} (tg_id, coin_names) VALUES (${chatId}, '')`, (err) => {
                    if (err)
                        console.log(err);
                });
        });
        con.release();
    });
};
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
        + '/deleteFavourite {currency_symbol} - удаляет криптовалюту из избранного.');
});
bot.onText(/\/listRecent/, (msg) => __awaiter(void 0, void 0, void 0, function* () {
    const chatId = msg.chat.id;
    const { data } = yield axios_1.default.get('https://crypto-rest-api-ts.herokuapp.com/');
    const time = data[data.length - 1].dateTimeStamp;
    let message = '';
    data.slice(-1000).filter((el) => {
        if (el.dateTimeStamp === time && el.markets.includes('kucoin') && el.markets.includes('coinpaprika') &&
            el.markets.includes('coinbase') && el.markets.includes('coinstats') && el.markets.includes('coinmarketcap'))
            message += `/${el.coin_name} 	$${el.average_price}\n`;
    });
    yield bot.sendMessage(chatId, message);
}));
bot.onText(/\/listFavorite/, (msg) => __awaiter(void 0, void 0, void 0, function* () {
    const chatId = msg.chat.id;
    const { data } = yield axios_1.default.get('https://crypto-rest-api-ts.herokuapp.com/');
    userChecking(chatId, tableFavoriteName);
    pool.getConnection((err, con) => {
        if (err)
            console.log(err);
        con.query(`SELECT * FROM ${tableFavoriteName} WHERE tg_id = ${chatId}`, (err, result) => {
            if (err)
                console.log(err);
            const coins = result[0].coin_names.split(',');
            const time = data[data.length - 1].dateTimeStamp;
            const filteredCoins = data.filter((el) => (coins.includes(el.coin_name) && el.dateTimeStamp === time));
            let stringMsg = '';
            filteredCoins.forEach((el) => stringMsg += `/${el.coin_name} $${el.average_price}\n`);
            if (stringMsg) // added 10.08.2022
                bot.sendMessage(chatId, stringMsg);
        });
        con.release();
    });
}));
bot.onText(/\/addToFavorite (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    userChecking(chatId, tableFavoriteName);
    if (match) {
        const resp = match[1].trim().toUpperCase();
        pool.getConnection((err, con) => {
            if (err)
                console.log(err);
            con.query(`SELECT * FROM ${tableFavoriteName} WHERE tg_id = ${chatId}`, (err, result) => {
                var _a;
                if (err)
                    console.log(err);
                const coins = (_a = result[0]) === null || _a === void 0 ? void 0 : _a.coin_names.split(',');
                if (!coins.includes(resp)) {
                    coins.push(resp);
                    let updatedString = coins.join(',');
                    if (updatedString[0] === ',')
                        updatedString = updatedString.slice(1);
                    con.query(`UPDATE ${tableFavoriteName} SET coin_names = "${updatedString}" WHERE tg_id = ${chatId}`, (err) => {
                        if (err)
                            console.log(err);
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
            if (err)
                console.log(err);
            con.query(`SELECT * FROM ${tableFavoriteName} WHERE tg_id = ${chatId}`, (err, result) => {
                var _a;
                if (err)
                    console.log(err);
                const coins = (_a = result[0]) === null || _a === void 0 ? void 0 : _a.coin_names.split(',');
                if (coins) {
                    const indexOfCoin = coins.indexOf(resp);
                    if (indexOfCoin > -1)
                        coins.splice(indexOfCoin, 1);
                    const updatedString = coins.join(',');
                    con.query(`UPDATE ${tableFavoriteName} SET coin_names = "${updatedString}" WHERE tg_id = ${chatId}`, (err) => {
                        if (err)
                            console.log(err);
                    });
                }
            });
            con.release();
        });
    }
});
bot.onText(/\/(.+)/, (msg, match) => __awaiter(void 0, void 0, void 0, function* () {
    const chatId = msg.chat.id;
    userChecking(chatId, tableFollowName);
    if (match) {
        const resp = match[1].trim().toUpperCase();
        const { data } = yield axios_1.default.get('https://crypto-rest-api-ts.herokuapp.com/', { data: { coinName: `${resp}` } });
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
            let sendString = '';
            data.forEach((el) => {
                if (timesAgo.includes(Date.parse(el.dateTimeStamp)))
                    sendString += `${el.coin_name} $${el.average_price} ${new Date(el.dateTimeStamp).toLocaleString()}\n`;
            });
            pool.getConnection((err, con) => {
                if (err)
                    console.log(err);
                con.query(`SELECT * FROM ${tableFollowName} WHERE tg_id = ${chatId}`, (err, result) => {
                    var _a;
                    const coins = (_a = result[0]) === null || _a === void 0 ? void 0 : _a.coin_names.split(',');
                    if (coins.includes(resp)) {
                        const indexOfCoin = coins.indexOf(resp);
                        if (indexOfCoin > -1)
                            coins.splice(indexOfCoin, 1);
                        const updatedString = coins.join(',');
                        bot.sendMessage(chatId, sendString, buttons.deletingButton);
                        bot.on("callback_query", (callbackQuery) => {
                            if (callbackQuery.data == 'remove') {
                                con.query(`UPDATE ${tableFollowName} SET coin_names = "${updatedString}" WHERE tg_id = ${chatId}`, (err) => {
                                    if (err)
                                        console.log(err);
                                });
                            }
                        });
                    }
                    else {
                        coins.push(resp);
                        let updatedResp = coins.join(',');
                        if (updatedResp[0] === ',')
                            updatedResp = updatedResp.slice(1);
                        bot.sendMessage(chatId, sendString, buttons.addingButton);
                        bot.on("callback_query", (callbackQuery) => {
                            if (callbackQuery.data == 'add') {
                                con.query(`UPDATE ${tableFollowName} SET coin_names = "${updatedResp}" WHERE tg_id = ${chatId}`, (err) => {
                                    if (err)
                                        console.log(err);
                                });
                            }
                        });
                    }
                });
                con.release();
            });
        }
    }
}));
