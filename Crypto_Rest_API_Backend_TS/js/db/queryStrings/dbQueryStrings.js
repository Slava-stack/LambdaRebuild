"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    tablesListQuery: "SHOW tables",
    createTableQuery: (tableName) => `CREATE TABLE ${tableName} (
    id INT PRIMARY KEY AUTO_INCREMENT,
    coin_name VARCHAR(15) NOT NULL,
    average_price DECIMAL(38, 20) NOT NULL,
    dateTimeStamp DATETIME NOT NULL,
    markets VARCHAR(255))`,
    insertQuery: (tableName) => `INSERT INTO ${tableName} (
    coin_name, 
    average_price, 
    dateTimeStamp, 
    markets) 
    VALUES ?`,
    selectCoinQuery: (tableName, strings) => `SELECT 
  coin_name, 
  average_price, 
  dateTimeStamp, 
  markets 
  FROM ${tableName}${strings}`,
    defineTimePeriod: (timeStart, timeEnd) => `dateTimeStamp 
  BETWEEN "${timeStart}" AND "${timeEnd}"`,
    marketsLike: (market) => `markets LIKE '%${market.toLowerCase()}%'`,
};
