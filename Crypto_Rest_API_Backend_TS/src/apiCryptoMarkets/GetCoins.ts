import axios from "axios";

export default abstract class GetCoins {
  constructor(public url: string) {
    this.url = url;
  }

  async getApiResponse() {
    const response = await axios.get(this.url);
    return response;
  }
}
