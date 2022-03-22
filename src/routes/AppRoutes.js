//App组件的路由配置
//引入路由组件
import Login from "../pages/Login";
import UserCenter from "../pages/UserCenter";

//形成路由配置的数组
const AppRouteConfig = [
  { path: "/login", component: Login },
  { path: "/UserCenter", component: UserCenter },
];

//暴露路由配置数组
export default AppRouteConfig;
