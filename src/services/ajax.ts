"use strict";

import axios from "axios";
import Vue from "vue";
import router from "../router";
import store from "../store/index";
const vue = new Vue({
  router,
  store,
});
const headersOrder = (token: any,roomid:any) => {
  return {
    "Accept": "application/json, text/plain, */*",
    "Content-Type": "application/json;charset=utf-8;",
    "token": token,
    "room_id":roomid

  };
};
const headers = (token: any) => {
  return {
    "Accept": "application/json, text/plain, */*",
    "Content-Type": "application/json;charset=utf-8;",
    "token": token,
  };
};

axios.interceptors.request.use((config) => {
  config.baseURL = "http://zzyinchat.com/api";
  config.timeout = 60 * 1000; // Timeout
  return config;
}, (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use((res) => {
  let data;
  if (res && res.data) {
    data = res;
  }

  return res;
}, (error) => {
  if (error.response) {
    const { status, statusText } = error.response;
    if (status === 500) {
      return;
    }
  }

  return Promise.resolve(error.response);
});

const post = (url: any, data: any, isUploadFile = false) => {
  const TOKEN = localStorage.getItem("token") || "";
  const datas = data || {};
  
  return axios({
    method: "post",
    url,
    headers: headers(TOKEN),
    data: datas,
  }).then((response) => {
    const res = { ...response };
    if (res) {
      return res;
    }
  });
};

// 创建实例
const newService = axios.create();

// 上传文件
const form = (url: any, data: any) => {
  const TOKEN = vue.$store.getters.token || "";
  return axios({
    method: "post",
    url,
    headers: headers(TOKEN),
    data,
  }).then((response) => {
    const res = { ...response };
    if (res) {
      return res.data;
    }
  });
};

newService.interceptors.request.use(
  (config) => {
    config.baseURL = "http://zzyinchat.com/api";
    config.timeout = 60 * 1000; // Timeout
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
const get = (url: any) => {
  const TOKEN = vue.$store.state.token || "";

  return newService({
    method: "get",
    url,
    headers: headers(TOKEN),
  }).then((response) => {
    return response;
  });
};

export default {
  post,
  form,
  get,
};
