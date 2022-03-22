import myAxios from "./intercept";

//POST发送获取验证码的ajax请求
export const getVerify = (phone) => {
  return myAxios.post("api1/login/digits", { phone });
};

//POST发送登录的ajax请求
export const login = (phone, code) => {
  return myAxios.post("api1/login/phone", { phone, code });
};

//POST发送权限控制的ajax请求
export const isLogin = () => {
  return myAxios.post("api1/login/verify");
};

//POST发送退出登录的ajax请求
export const logout = (_id) => {
  return myAxios.post("api1/logout", { _id });
};
