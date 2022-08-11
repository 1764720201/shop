import { defineStore } from "pinia";
import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api/index";
import { getUUID } from "@/utils/uuid_token";
import type { response } from "@/types/response";
import type {
  Detail,
  CategoryView,
  SpuSaleAttrList,
  SkuInfo,
  SkuImageList,
} from "@/types/detail";

export const useDetailStore = defineStore({
  id: "detail",
  state: () => ({
    goodsList: <Detail>{},
    uuid_token: getUUID(),
  }),
  getters: {
    spuSaleAttrList(state): SpuSaleAttrList[] {
      return state.goodsList.spuSaleAttrList || [];
    },
    categoryView(state): CategoryView {
      return state.goodsList.categoryView || {};
    },
    skuInfo(state): SkuInfo {
      return state.goodsList.skuInfo || {};
    },
    // skuImageList(state): SkuImageList[] {
    //   return state.goodsList.skuInfo.skuImageList || [];
    // },
  },
  actions: {
    async getGoodsInfo(skuId: string) {
      const result: response = await reqGoodsInfo(skuId);
      this.goodsList = result.data;
    },
    async addOrUpdateShopCart(skuId: number, skuNum: number) {
      let result: response = await reqAddOrUpdateShopCart(skuId, skuNum);
      if (result.code == 200) {
        return "ok";
      } else {
        return Promise.reject(new Error("faile"));
      }
    },
  },
});
