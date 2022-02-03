import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import AcctDetail from "../views/AcctDetail.vue";
import BusinessList from "../views/BusinessList.vue";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import MakeOrder from "../views/MakeOrder.vue";
import OrderList from "../views/OrderList.vue";
import PromotionList from "../views/PromotionList.vue";
import Register from "../views/Register.vue";
import About from "../views/settings/About.vue";
import BankCard from "../views/settings/account/BankCard.vue";
import Account from "../views/settings/account/index.vue";
import Info from "../views/settings/account/Info.vue";
import NewCard from "../views/settings/account/NewCard.vue";
import Nickname from "../views/settings/account/Nickname.vue";
import Password from "../views/settings/account/Password.vue";
import TxtPassword from "../views/settings/account/TxtPassword.vue";
import Comment from "../views/settings/comment.vue";
import Setting from "../views/settings/index.vue";
import User from "../views/User.vue";
import WithdrawList from "../views/WithdrawList.vue";
import Worderlist from "../views/Worderlist.vue";
import Withdraw from "../views/Withdraw.vue";
import Recharge from "../views/Recharge.vue";
import OrderInfo from "../views/OrderInfo.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/businessList",
    name: "BusinessList",
    component: BusinessList,
  },
  {
    path: "/orderList",
    name: "OrderList",
    component: OrderList,
  },
  {
    path: "/promotionList",
    name: "PromotionList",
    component: PromotionList,
  },
  {
    path: "/user",
    name: "User",
    component: User,
  },
  {
    path: "/setting",
    name: "Setting",
    component: Setting,
  },
  {
    path: "/makeOrder/:id",
    name: "MakeOrder",
    component: MakeOrder,
  },
  {
    path: "/orderInfo/:id",
    name: "OrderInfo",
    component: OrderInfo,
  },
  {
    path: "/account",
    name: "Account",
    component: Account,
  },
  {
    path: "/nickname",
    name: "Nickname",
    component: Nickname,
  },
  {
    path: "/info",
    name: "Info",
    component: Info,
  },
  {
    path: "/password",
    name: "Password",
    component: Password,
  },
  {
    path: "/txtPassword",
    name: "TxtPassword",
    component: TxtPassword,
  },
  {
    path: "/bankCard",
    name: "BankCard",
    component: BankCard,
  },
  {
    path: "/newCard",
    name: "NewCard",
    component: NewCard,
  },
  {
    path: "/comment",
    name: "Comment",
    component: Comment,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/acctDetail",
    name: "AcctDetail",
    component: AcctDetail,
  },
  {
    path: "/withdrawList",
    name: "WithdrawList",
    component: WithdrawList,
  },
  {
    path: "/worderlist",
    name: "Worderlist",
    component: Worderlist,
  },
  {
    path: "/withdraw",
    name: "Withdraw",
    component: Withdraw,
  },
  {
    path: "/recharge",
    name: "Recharge",
    component: Recharge,
  },
  
  /* {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/About.vue')
  } */
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
