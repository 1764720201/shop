import requests from "./request";
import mockRequests from "./mock";
import type { SearchParmas } from "@/types/search";
import type { Login, Verify } from "@/types/user";
import type { Submit } from "@/types/trade";
export const reqCategoryList = () =>
  requests.get("/product/getBaseCategoryList");
export const reqSearchInfo = (params: SearchParmas) =>
  requests({
    url: "/list",
    method: "post",
    data: params,
  });
export const reqGoodsInfo = (skuId: string) =>
  requests({
    url: `/item/${skuId}`,
    method: "get",
  });
//
export const reqAddOrUpdateShopCart = (skuId: number, skuNum: number) =>
  requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "post",
  });
export const reqCartList = () =>
  requests({ url: "/cart/cartList", method: "get" });
export const reqGetCode = (phone: string) =>
  requests({ url: `/user/passport/sendCode/${phone}`, method: "get" });
export const reqUserRegister = (data: Verify) =>
  requests({ url: "/user/passport/register", method: "post", data });

export const reqUserLogin = (data: Login) =>
  requests({ url: "/user/passport/login", data, method: "post" });
export const reqUserInfo = () =>
  requests({ url: "/user/passport/auth/getUserInfo", method: "get" });
export const reqLogout = () =>
  requests({
    url: "user/passport/logout",
    method: "get",
  });

export const reqAddressInfo = () =>
  requests({
    url: "/user/userAddress/auth/findUserAddressList",
    method: "get",
  });
export const reqOrderInfo = () =>
  requests({
    url: "/order/auth/trade",
    method: "get",
  });
export const reqSubmitOrder = (tradeNo: string, data: Submit) =>
  requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: "post",
    data,
  });
export const reqPayInfo = (tradeNo: string) =>
  requests({
    url: `/payment/weixin/createNative/${tradeNo}`,
    method: "get",
  });
export const reqPayStatus = (orderId: string) =>
  requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: "get",
  });
export const reqMyOrderList = (page: number, limit: number) =>
  requests({
    url: `/order/auth/${page}/${limit}`,
    method: "get",
  });
export const reqBannerList = () => mockRequests.get("/banner");
export const reqFloorList = () => mockRequests.get("/floor");
