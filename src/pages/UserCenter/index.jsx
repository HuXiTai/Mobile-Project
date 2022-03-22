import React, { Component } from "react";
//引入antd相应组件
import { NavBar, List, Input, Toast, Button } from "antd-mobile";
//引入样式
import "./index.less";
//引入ajax请求 
import { isLogin, logout } from "../../api/ajax";

export default class UserCenter extends Component {
  state = {
    avatar: "",
    nickName: "",
    username: "",
    phone: "",
    _id: "",
  };
  render() {
    const { avatar, nickName, username, phone } = this.state;
    return (
      <div>
        <NavBar>个人中心</NavBar>
        <div className="con">
          <div>
            <img src={avatar} alt="" />
          </div>
          <p>欢迎，用户 {nickName}</p>
        </div>
        <List
          style={{
            "--prefix-width": "6em",
          }}
          className="ipt"
        >
          <List.Item prefix="名称">
            <Input
              value={username}
              disabled
              style={{ "--font-size": "18px", "--disabled-color": "#666" }}
            />
          </List.Item>
          <List.Item prefix="手机">
            <Input
              value={phone}
              disabled
              style={{ "--font-size": "18px", "--disabled-color": "#666" }}
            />
          </List.Item>
        </List>
        <Button
          block
          color="danger"
          size="large"
          className="signBtn"
          onClick={this.logout}
        >
          退出
        </Button>
      </div>
    );
  }

  //当组件渲染完成发送ajax请求，做权限管理
  async componentDidMount() {
    const isLoginResult = await isLogin();
    //获得到请求结果并做出判断
    if (isLoginResult.data.code !== 20000) {
      Toast.show({
        icon: "fail",
        content: "请登录",
      });
      //没有权限则返回到登录页面
      this.props.history.push("/login");
      return;
    }
    //否则就获取到里面的信息,定设置在状态里
    const { avatar, nickName, username, phone, _id } = isLoginResult.data.data;
    this.setState({ avatar, nickName, username, phone, _id });
  }

  //当点击退出是，调用退出请求
  logout = async () => {
    const { _id } = this.state;
    //调用退出请求的时候需要传入一个_id
    const logoutResult = await logout(_id);
    console.log(logoutResult);
    //发送请求后弹出轻提示
    Toast.show({
      icon: "success",
      content: "退出登录",
    });

    //然后直接跳转到登录页面
    this.props.history.push("/login");
  };
}
