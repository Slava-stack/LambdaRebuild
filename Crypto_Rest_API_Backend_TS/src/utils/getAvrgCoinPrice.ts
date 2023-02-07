import {
  symbolPriceApi,
  averagePriceInterface,
  apiInterface,
} from "../interfaces/types";

export default async function getAverageCoinPrice(
  arrayOfCoinArrays: PromiseSettledResult<symbolPriceApi[]>[]
) {
  const averagePrice: averagePriceInterface = {};
  const apis: apiInterface = {};
  arrayOfCoinArrays.forEach((el) => {
    if (el.status === "fulfilled") {
      el.value.forEach(({ symbol, price, api }) => {
        const key = symbol;
        const value = price;
        const idApi = api;
        if (key in averagePrice) {
          averagePrice[key].push(value);
        } else {
          averagePrice[key] = [value];
        }
        if (key in apis) {
          apis[key] += ` ${idApi}`;
        } else {
          apis[key] = idApi;
        }
      });
    }
  });
  const dateTime = new Date(`${Date()} UTC`)
    .toISOString()
    .replace(/T/, " ")
    .replace(/:\d\d\....Z/, "");
  return Object.keys(averagePrice).map((el) => {
    const apiIds: string = apis[el];
    const values: number[] = Object.values(averagePrice[el]);
    const price =
      values.reduce((a: number, b: number) => a + b, 0) / values.length;
    return [el, price, dateTime, apiIds];
  });
}
