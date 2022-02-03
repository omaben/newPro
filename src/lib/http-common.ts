import axios, { AxiosStatic } from "axios";

const instance = axios.create({
  // baseURL: "http://184.168.122.58:9501/",
  timeout: 3000,
});

class http {
  public static async get(url: any, params: any) {
    return await instance.get(url, { params });
  }

  public static async post(url: any, params: any) {
    return await instance.post(url, JSON.stringify(params));
  }
}

export default http;
