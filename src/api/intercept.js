import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

//创建子axios，和基础URL
const myAxios = axios.create({ baseURL: "http://localhost:3000" });

//设置请求拦截器
myAxios.interceptors.request.use(
  (config) => {
    //设置进度条,开始
    NProgress.start();
    // 在发送请求之前做些什么
    return config;
  },
  (err) => {
    // 对请求错误做些什么
    return Promise.reject(err);
  }
);

//设置响应拦截器
myAxios.interceptors.response.use(
  (res) => {
    //设置进度条,结束
    NProgress.done();
    // 对响应数据做点什么
    return res;
  },
  (err) => {
    // 对响应错误做点什么
    return Promise.reject(err);
  }
);

export default myAxios;
