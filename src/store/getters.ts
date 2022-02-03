const state = {
  token: localStorage.getItem("token") || "", // 初始化的时候取缓存,
  defaultCard: localStorage.getItem("defaultCard") || "", // 初始化的时候取缓存,
};
const getters = {
  token: (state: any) => state.token,
  defaultCard: (state: any) => state.defaultCard,
};
export default getters;
