"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbQueryStrings_1 = __importDefault(require("./queryStrings/dbQueryStrings"));
const pool_1 = __importDefault(require("./pool"));
const { insertQuery } = dbQueryStrings_1.default;
const tableName = "Coin";
function writeCoinsToDB(coinArray) {
    pool_1.default.getConnection((err, con) => {
        if (err)
            console.log(err);
        else {
            con.query(insertQuery(tableName), [coinArray], (err) => {
                if (err)
                    console.error(err);
            });
        }
        con.release();
    });
}
exports.default = writeCoinsToDB;
