import { defineStore } from "pinia";
import { reqSearchInfo } from "@/api";
import type {
  SearchInfo,
  SearchParmas,
  AttrsList,
  GoodsList,
  TrademarkList,
} from "@/types/search";
import type { response } from "@/types/response";
export const useSearchStore = defineStore({
  id: "search",
  state: () => ({
    searchInfo: <SearchInfo>{},
  }),
  getters: {
    attrsList(state): AttrsList[] {
      return state.searchInfo.attrsList || [];
    },
    goodsList(state): GoodsList[] {
      return state.searchInfo.goodsList || [];
    },
    trademarkList(state): TrademarkList[] {
      return state.searchInfo.trademarkList || {};
    },
    total(state): number {
      return state.searchInfo.total || 0;
    },
  },
  actions: {
    async getSearchList(params: SearchParmas) {
      const result: response = await reqSearchInfo(params);
      this.searchInfo = result.data;
    },
  },
});
