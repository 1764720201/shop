import { reqCartList } from "@/api";
import type { response } from "@/types/response";
import type { ShopCart } from "@/types/shopCart";
import { defineStore } from "pinia";

export const useShopCartStore = defineStore({
  id: "shopcart",
  state: () => ({
    shopCart: <ShopCart[]>[],
  }),
  actions: {
    async getCartList() {
      let result: response = await reqCartList();
      if (result.code == 200) {
        this.shopCart = result.data;
      }
    },
  },
  getters: {
    cartList(state) {
      return state.shopCart[0] || {};
    },
  },
});
