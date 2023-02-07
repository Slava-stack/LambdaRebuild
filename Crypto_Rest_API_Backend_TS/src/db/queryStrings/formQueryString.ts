import dbStrings from "./dbQueryStrings";

import { getCoinInterface } from "../../interfaces/types";

const { defineTimePeriod, marketsLike } = dbStrings;

export default function formQueryString(params: getCoinInterface) {
  const { coinName, market, timePeriodStart, timePeriodFinish } = params;

  const coinString = coinName ? `coin_name = "${coinName}"` : null;
  const allMarkets = [
    "coinmarketcap",
    "coinbase",
    "coinstats",
    "kucoin",
    "coinpaprika",
  ];
  const marketString = allMarkets.includes(market.toLowerCase())
    ? marketsLike(market)
    : null;
  const dateTimeString =
    timePeriodStart && timePeriodFinish
      ? defineTimePeriod(timePeriodStart, timePeriodFinish)
      : null;
  const stringsElements = [coinString, marketString, dateTimeString];
  let strings = "";

  const isValidQueryElements =
    stringsElements.filter((el) => el === null).length === 3;
  if (!isValidQueryElements) {
    strings += " WHERE ";
    stringsElements.forEach((el) => {
      if (el) {
        strings += `${el} AND `;
      }
    });
    strings = strings.slice(0, -5);
  }
  return strings;
}
