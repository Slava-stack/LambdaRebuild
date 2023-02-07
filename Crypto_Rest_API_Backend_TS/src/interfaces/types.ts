type filteredResult = {
  coin_name: string;
  average_price: number;
  dateTimeStamp: string;
  markets?: string;
};
type symbolAndPrice = { symbol: string; price: number };
type symbolPriceApi = { symbol: string; price: number; api: string };
type getCoinInterface = {
  coinName: string;
  market: string;
  timePeriodStart: string;
  timePeriodFinish: string;
};
type coinMarketCoin = {
  symbol: string;
  quote: { USD: { price: number } };
};
type coinMarketResponse = {
  data: { symbol: string; quote: { USD: { price: number } } }[];
};
type coinBaseCoin = { id: string; name: string; min_size: string };
type coinPaprkaCoin = {
  symbol: string;
  quotes: { USD: { price: number } };
};
type averagePriceInterface = { [symbol: string]: number[] };
type apiInterface = { [symbol: string]: string };
type coinStatResponse = { coins: { symbol: string; price: number }[] };
type kuCoinResponse = { data: { [key: string]: string } };
type coinBaseResponse = { rates: { [key: string]: string } };

type coinPapricaResponse = {
  data: {
    symbol: string;
    quotes: { USD: { price: number } };
  }[];
};
type coinBaseCurrenciesResp = { data: coinBaseCoin[] };
export {
  filteredResult,
  symbolAndPrice,
  symbolPriceApi,
  getCoinInterface,
  coinMarketCoin,
  coinBaseCoin,
  coinPaprkaCoin,
  averagePriceInterface,
  apiInterface,
  coinStatResponse,
  kuCoinResponse,
  coinPapricaResponse,
  coinMarketResponse,
  coinBaseCurrenciesResp,
  coinBaseResponse,
};
