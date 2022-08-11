import axios from "axios";
//进度条
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import useStore from "@/stores";

const requests = axios.create({
  baseURL: "/api",
  method: "GET",
});
requests.interceptors.request.use((config) => {
  if (useStore().detail.uuid_token) {
    config.headers!.userTempId = useStore().detail.uuid_token;
  }
  if (useStore().user.token) {
    config.headers!.token = useStore().user.token!;
  }
  nprogress.start();
  return config;
});
requests.interceptors.response.use(
  (res) => {
    nprogress.done();
    return res.data;
  },
  (err) => {
    return Promise.reject(new Error("faile"));
  }
);

export default requests;
