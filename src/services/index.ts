import axios from "./ajax";
import api from "./api";

async function getCaptcha(post: any) {
  const res = await axios.get(api.captcha);
  return res.data;
}
async function getCarousels(post: any) {
  const res: any = await axios.post(api.carousels, post);
  return res.data;
}
async function getIssues(post: any) {
  const res: any = await axios.post(api.issues, post);
  return res.data;
}
async function bet(post: any) {
  const res: any = await axios.post(api.bet, post);
  return res.data;
}
async function login(post: any) {
  const res: any = await axios.post(api.login, post);
  return res.data;
}
async function register(post: any) {
  const res: any = await axios.post(api.register, post);
  return res.data;
}
async function logout(post: any) {
  const res: any = await axios.post(api.logout, post);
  return res.data;
}
async function userInfo(post: any) {
  const res: any = await axios.post(api.userInfo, post);
  return res.data;
}
async function updatePassword(post: any) {
  const res: any = await axios.post(api.updatePassword, post);
  return res.data;
}
async function addTradePassword(post: any) {
  const res: any = await axios.post(api.addTradePassword, post);
  return res.data;
}
async function updateTradePassword(post: any) {
  const res: any = await axios.post(api.updateTradePassword, post);
  return res.data;
}
async function addCard(post: any) {
  const res: any = await axios.post(api.addCard, post);
  return res.data;
}
async function delCard(post: any) {
  const res: any = await axios.post(api.delCard, post);
  return res.data;
}
async function cards(post: any) {
  const res: any = await axios.post(api.cards, post);
  return res.data;
}
async function orders(post: any) {
  const res: any = await axios.post(api.orders, post);
  return res.data;
}
async function withdraw(post: any) {
  const res: any = await axios.post(api.withdraw, post);
  return res.data;
}
async function withdraws(post: any) {
  const res: any = await axios.post(api.withdraws, post);
  return res.data;
}
async function recharges(post: any) {
  const res: any = await axios.post(api.recharges, post);
  return res.data;
}
async function bills(post: any) {
  const res: any = await axios.post(api.bills, post);
  return res.data;
}

async function configs(post: any) {
  const res: any = await axios.post(api.configs, post);
  return res.data;
}

async function rooms(post: any) {
  const res: any = await axios.post(api.rooms, post);
  return res.data;
}

async function updateUserInfo(post: any) {
  const res: any = await axios.post(api.updateUserInfo, post);
  return res.data;
}

export {
  getCaptcha,
  getCarousels,
  rooms,
  configs,
  bills,
  recharges,
  withdraws,
  withdraw,
  orders,
  cards,
  delCard,
  addCard,
  addTradePassword,
  updateTradePassword,
  updatePassword,
  userInfo,
  logout,
  register,
  login,
  bet,
  getIssues,
  updateUserInfo,
};
