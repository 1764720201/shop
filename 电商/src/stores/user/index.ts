import { defineStore } from "pinia";
import {
  reqGetCode,
  reqLogout,
  reqUserInfo,
  reqUserLogin,
  reqUserRegister,
} from "@/api";
import type { response } from "@/types/response";
import type { Login, UserInfo, Verify } from "@/types/user";
export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    code: <string>"",
    token: localStorage.getItem("TOKEN"),
    userInfo: <UserInfo>{},
  }),
  actions: {
    async getCode(phone: string) {
      let result: response = await reqGetCode(phone);
      if (result.code == 200) {
        this.code = result.data;
      } else {
        Promise.reject(new Error("faile"));
      }
    },
    async getRegister(data: Verify) {
      await reqUserRegister(data);
    },
    async getLogin(data: Login) {
      let result: response = await reqUserLogin(data);
      if (result.code == 200) {
        this.token = result.data.token;
        localStorage.setItem("TOKEN", result.data.token);
        return "ok";
      } else {
        return Promise.reject(new Error("请输入正确的账号或密码"));
      }
    },
    async getUserInfo() {
      let result: response = await reqUserInfo();
      if (result.code == 200) {
        this.userInfo = result.data;
        return "ok";
      } else {
        return Promise.reject(new Error("faile"));
      }
    },
    async getLogout() {
      let result: response = await reqLogout();
      if (result.code == 200) {
        this.code = "";
        this.userInfo.name = "";
        localStorage.removeItem("TOKEN");
        return "ok";
      } else {
        return Promise.reject(new Error("faile"));
      }
    },
  },
  getters: {},
});
