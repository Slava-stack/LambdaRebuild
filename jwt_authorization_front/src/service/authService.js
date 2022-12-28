import api from "../http/axiosInstance";
import axios from "axios";

export default class AuthService {
  static async me() {
    try {
      const resp = await api.get("/me");
      return resp;
    } catch (e) {
      console.log(e);
    }
  }

  static async login(email, password) {
    try {
      const resp = await api.post(`/login?email=${email}&password=${password}`);
      return resp.data;
    } catch (e) {
      console.log(e);
    }
  }

  static async register(email, password) {
    try {
      const resp = await axios.post(
        "http://142.93.134.108:1111/sign_up",
        JSON.stringify({ email, password }),
        // mb i should get rid of that object with headers
        // https://masteringjs.io/tutorials/axios/post-json
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return resp.data;
    } catch (e) {
      console.log(e);
    }
  }

  static async refresh() {
    try {
      const resp = await api.post("/refresh");
      return resp.data;
    } catch (e) {
      console.log(e);
    }
  }
}
