"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// SRY:))
// done cuz of that that output: RowDataPacket { Tables_in_heroku_b8f41f7c25087ff: 'coin' }
const pool_1 = __importDefault(require("./pool"));
const dbQueryStrings_1 = __importDefault(require("./queryStrings/dbQueryStrings"));
const tableName = "Coin";
const { tablesListQuery, createTableQuery } = dbQueryStrings_1.default;
function dbValidation() {
    pool_1.default.getConnection((err, con) => {
        if (err) {
            console.log(err);
        }
        if (!err) {
            con.query(tablesListQuery, (err, result) => {
                const allTables = result.map((el) => el.Tables_in_heroku_b8f41f7c25087ff);
                const isTablePresent = allTables.includes(tableName.toLowerCase());
                if (!isTablePresent) {
                    con.query(createTableQuery(tableName), (er) => {
                        if (er)
                            console.error(er);
                        console.warn(`No such table. So creating ${tableName} tables`);
                    });
                }
            });
            con.release();
        }
    });
}
exports.default = dbValidation;
