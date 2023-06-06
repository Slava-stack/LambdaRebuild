import axios from "axios";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export default async function getIATA(code: string) {
  const airportsAPI = `https://airlabs.co/api/v9/airports?api_key=${process.env.API_KEY_AIRLABS}&country_code=${code}`;
  const { data } = await axios.get(airportsAPI);
  const [airport] = data.response;
  if (airport) {
    const { iata_code }: { iata_code: string } = airport;
    return iata_code;
  }
  return "no closest airport code";
}
