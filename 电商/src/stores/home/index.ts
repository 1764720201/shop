import { defineStore } from "pinia";
import { reqCategoryList, reqBannerList, reqFloorList } from "@/api";
import type { CategoryList } from "@/types/cetagoryList";
import type { BannerList } from "@/types/bannerList";
import type { FloorList } from "@/types/floorList";
import type { response } from "@/types/response";

export const useHomeStore = defineStore({
  id: "home",
  state: () => ({
    categoryList: <CategoryList[]>[],
    bannerList: <BannerList[]>[],
    floorList: <FloorList[]>[],
  }),
  getters: {},
  actions: {
    async getCategoryList() {
      const result: response = await reqCategoryList();
      if (result.code == 200) {
        this.categoryList = result.data.slice(0, 16);
      }
    },
    async getBannerList() {
      const result: response = await reqBannerList();
      if (result.code == 200) {
        this.bannerList = result.data;
      }
    },
    async getFloorList() {
      const result: response = await reqFloorList();
      if (result.code == 200) {
        this.floorList = result.data;
      }
    },
  },
});
