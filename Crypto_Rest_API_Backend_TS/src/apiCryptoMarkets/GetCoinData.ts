import axios from "axios";
import GetCoins from "./GetCoins";
import {
  symbolPriceApi,
  coinMarketCoin,
  coinMarketResponse,
  coinStatResponse,
  symbolAndPrice,
  kuCoinResponse,
  coinPapricaResponse,
  coinPaprkaCoin,
  coinBaseCoin,
  coinBaseCurrenciesResp,
  coinBaseResponse,
} from "../interfaces/types";

export default class GetCoinData extends GetCoins {
  private coinBaseCurrenciesUrl = "https://api.coinbase.com/v2/currencies";

  async getCoinMarketCapResponse() {
    const response = await this.getApiResponse();
    const { data }: coinMarketResponse = response.data;
    return data;
  }

  async getCoinMarketCapMappedValue() {
    const data = await this.getCoinMarketCapResponse();
    const coinMarketCapMapped: symbolPriceApi[] = data.map(
      (el: coinMarketCoin): symbolPriceApi => ({
        symbol: el.symbol,
        price: el.quote.USD.price,
        api: "coinmarketcap",
      })
    );
    return coinMarketCapMapped;
  }

  async getCoinStatResponse() {
    const response = await this.getApiResponse();
    const { coins }: coinStatResponse = response.data;
    return coins;
  }

  async getCoinStatMappedValue() {
    const data = await this.getCoinStatResponse();
    const coinStatsMapped: symbolPriceApi[] = data.map(
      (el: symbolAndPrice): symbolPriceApi => ({
        symbol: el.symbol,
        price: el.price,
        api: "coinstats",
      })
    );
    return coinStatsMapped;
  }

  async getKuCoinResponse() {
    const response = await this.getApiResponse();
    const { data }: kuCoinResponse = response.data;
    return data;
  }

  async getKuCoinMappedValue() {
    const data = await this.getKuCoinResponse();
    const kuCoinMapped: symbolPriceApi[] = Object.keys(data).map(
      (el): symbolPriceApi => ({ symbol: el, price: +data[el], api: "kucoin" })
    );
    return kuCoinMapped;
  }

  async getCoinPapricaResponse() {
    const response = await this.getApiResponse();
    const { data }: coinPapricaResponse = response;
    return data;
  }

  async getCoinPapricaMappedValue() {
    const data = await this.getCoinPapricaResponse();
    const coinPaprikaMapped: symbolPriceApi[] = data.map(
      (el: coinPaprkaCoin): symbolPriceApi => ({
        symbol: el.symbol,
        price: el.quotes.USD.price,
        api: "coinpaprika",
      })
    );
    return coinPaprikaMapped;
  }

  private async getCoinBaseCurrenciesResponse() {
    const response = await axios.get(this.coinBaseCurrenciesUrl);
    const { data }: coinBaseCurrenciesResp = response.data;
    return data;
  }

  async getCoinBaseExchangeResponse() {
    const response = await this.getApiResponse();
    const { rates }: coinBaseResponse = response.data.data;
    return rates;
  }

  async getCoinBaseMappedValue() {
    const currencyResponse = await this.getCoinBaseCurrenciesResponse();
    const currArray: string[] = currencyResponse.map(
      (el: coinBaseCoin) => el.id
    );
    const cryptoAndCurrenciesResp = await this.getCoinBaseExchangeResponse();
    const dollar: number = 1;
    const coinBaseMapped: symbolPriceApi[] = Object.keys(
      cryptoAndCurrenciesResp
    )
      .filter((el) => !currArray.includes(el))
      .map(
        (el): symbolPriceApi => ({
          symbol: el,
          price: dollar / +cryptoAndCurrenciesResp[el],
          api: "coinbase",
        })
      );
    return coinBaseMapped;
  }
}
