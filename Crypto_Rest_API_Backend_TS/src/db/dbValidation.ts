import { RowDataPacket } from "mysql2"; // the only usage of this package to replace any
// SRY:))
// done cuz of that that output: RowDataPacket { Tables_in_heroku_b8f41f7c25087ff: 'coin' }
import pool from "./pool";
import dbStrings from "./queryStrings/dbQueryStrings";

const tableName = "Coin";
const { tablesListQuery, createTableQuery } = dbStrings;

export default function dbValidation() {
  pool.getConnection((err, con) => {
    if (err) {
      console.log(err);
    }
    if (!err) {
      con.query(tablesListQuery, (err, result) => {
        const allTables = result.map(
          (el: RowDataPacket) => el.Tables_in_heroku_b8f41f7c25087ff
        );
        const isTablePresent = allTables.includes(tableName.toLowerCase());
        if (!isTablePresent) {
          con.query(createTableQuery(tableName), (er) => {
            if (er) console.error(er);
            console.warn(`No such table. So creating ${tableName} tables`);
          });
        }
      });
      con.release();
    }
  });
}
