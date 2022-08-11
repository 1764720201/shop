import { reqAddressInfo, reqOrderInfo } from "@/api";
import type { response } from "@/types/response";
import type { AddressInfo, OrderInfo } from "@/types/trade";
import { defineStore } from "pinia";

export const useTradeStore = defineStore({
  id: "trade",
  state: () => ({
    addressInfo: <AddressInfo[]>[],
    orderInfo: <OrderInfo>{},
  }),
  actions: {
    async getAddressInfo() {
      let result: response = await reqAddressInfo();
      if (result.code == 200) {
        this.addressInfo = result.data;
      }
    },
    async getOrderInfo() {
      let result: response = await reqOrderInfo();
      if (result.code == 200) {
        this.orderInfo = result.data;
      }
    },
  },
  getters: {},
});
