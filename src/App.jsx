import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AppRouteConfig from "./routes/AppRoutes";

export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          {/* 根据路由配置的数组，遍历得到具体的配置 */}
          {AppRouteConfig.map((item) => {
            return <Route key={item.path} {...item} />;
          })}
          <Redirect to="/login" />
        </Switch>
      </div>
    );
  }
}
