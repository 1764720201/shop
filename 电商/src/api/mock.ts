import axios from "axios";
//进度条
import nprogress from "nprogress";
import "nprogress/nprogress.css";
const mockRequests = axios.create({
  baseURL: "/mock",
  method: "GET",
});
mockRequests.interceptors.request.use((config) => {
  nprogress.start();
  return config;
});
mockRequests.interceptors.response.use(
  (res) => {
    nprogress.done();
    return res.data;
  },
  (err) => {
    return Promise.reject(new Error("fail"));
  }
);
export default mockRequests;
