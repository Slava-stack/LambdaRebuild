import dbStrings from "./queryStrings/dbQueryStrings";
import pool from "./pool";

const { insertQuery } = dbStrings;
const tableName = "Coin";

export default function writeCoinsToDB(coinArray: (string | number)[][]) {
  pool.getConnection((err, con) => {
    if (err) console.log(err);
    else {
      con.query(insertQuery(tableName), [coinArray], (err) => {
        if (err) console.error(err);
      });
    }
    con.release();
  });
}
