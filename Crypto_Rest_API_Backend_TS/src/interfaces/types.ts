export type filteredResult = {
  coin_name: string;
  average_price: number;
  dateTimeStamp: string;
  markets?: string;
};
export type symbolAndPrice = { symbol: string; price: number };
export type symbolPriceApi = { symbol: string; price: number; api: string };
export type getCoinInterface = {
  coinName: string;
  market: string;
  timePeriodStart: string;
  timePeriodFinish: string;
};
export type coinMarketCoin = {
  symbol: string;
  quote: { USD: { price: number } };
};
export type coinBaseCoin = { id: string; name: string; min_size: string };
export type coinPaprkaCoin = {
  symbol: string;
  quotes: { USD: { price: number } };
};
export type averagePriceInterface = { [symbol: string]: number[] };
export type apiInterface = { [symbol: string]: string };
export type coinMarketResponse = {
  data: { symbol: string; quote: { USD: { price: number } } }[];
};
export type coinStatResponse = { coins: { symbol: string; price: number }[] };
export type kuCoinResponse = { data: { [key: string]: string } };
export type coinBaseResponse = { rates: { [key: string]: string } };
export type coinPapricaResponse = {
  data: {
    symbol: string;
    quotes: { USD: { price: number } };
  }[];
};
export type coinBaseCurrenciesResp = { data: coinBaseCoin[] };
