import { Response } from "express";
import dbStrings from "../queryStrings/dbQueryStrings";
import pool from "../pool";
import formQueryString from "../queryStrings/formQueryString";

import { filteredResult, getCoinInterface } from "../../interfaces/types";

// const { selectCoinQuery, defineTimePeriod, marketsLike } = dbStrings;
const { selectCoinQuery } = dbStrings;

const tableName = "Coin";

export default async function sendCoin(
  response: Response,
  params: getCoinInterface
) {
  pool.getConnection((err, con) => {
    if (err) {
      console.log(err); // delete that line or line below
      // res.send("error"); // instead of res it has to be response.send
    }
    if (!err) {
      const queryString = formQueryString(params);

      con.query(
        selectCoinQuery(tableName, queryString),
        (err: string, result: filteredResult[]) => {
          if (err) {
            console.log(err);
          }
          const alteredResult: filteredResult[] = result.map(
            (el: filteredResult) => ({
              coin_name: el.coin_name,
              average_price: el.average_price,
              dateTimeStamp: new Date(
                el.dateTimeStamp.toString()
              ).toLocaleString(),
              markets: el.markets, // or markets: market,
            })
          );
          response.send(JSON.stringify(alteredResult));
        }
      );
      con.release();
    }
  });
}
