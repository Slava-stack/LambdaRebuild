export default {
  tablesListQuery: "SHOW tables",
  createTableQuery: (tableName: string) => `CREATE TABLE ${tableName} (
    id INT PRIMARY KEY AUTO_INCREMENT,
    coin_name VARCHAR(15) NOT NULL,
    average_price DECIMAL(38, 20) NOT NULL,
    dateTimeStamp DATETIME NOT NULL,
    markets VARCHAR(255))`,
  insertQuery: (tableName: string) => `INSERT INTO ${tableName} (
    coin_name, 
    average_price, 
    dateTimeStamp, 
    markets) 
    VALUES ?`,
  selectCoinQuery: (tableName: string, strings: string) => `SELECT 
  coin_name, 
  average_price, 
  dateTimeStamp, 
  markets 
  FROM ${tableName}${strings}`,
  defineTimePeriod: (timeStart: string, timeEnd: string) => `dateTimeStamp 
  BETWEEN "${timeStart}" AND "${timeEnd}"`,
  marketsLike: (market: string) => `markets LIKE '%${market.toLowerCase()}%'`,
};
