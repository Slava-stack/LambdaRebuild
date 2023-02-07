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
const dbQueryStrings_1 = __importDefault(require("../queryStrings/dbQueryStrings"));
const pool_1 = __importDefault(require("../pool"));
const formQueryString_1 = __importDefault(require("../queryStrings/formQueryString"));
// const { selectCoinQuery, defineTimePeriod, marketsLike } = dbStrings;
const { selectCoinQuery } = dbQueryStrings_1.default;
const tableName = "Coin";
function sendCoin(response, params) {
    return __awaiter(this, void 0, void 0, function* () {
        pool_1.default.getConnection((err, con) => {
            if (err) {
                console.log(err); // delete that line or line below
                // res.send("error"); // instead of res it has to be response.send
            }
            if (!err) {
                const queryString = (0, formQueryString_1.default)(params);
                con.query(selectCoinQuery(tableName, queryString), (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    const alteredResult = result.map((el) => ({
                        coin_name: el.coin_name,
                        average_price: el.average_price,
                        dateTimeStamp: new Date(el.dateTimeStamp.toString()).toLocaleString(),
                        markets: el.markets, // or markets: market,
                    }));
                    response.send(JSON.stringify(alteredResult));
                });
                con.release();
            }
        });
    });
}
exports.default = sendCoin;
