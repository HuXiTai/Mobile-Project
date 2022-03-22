import React, { Component } from "react";
//引入antd相应组件
import { NavBar, List, Input, Button, Divider, Toast } from "antd-mobile";
//引入图片
import githubImg from "./img/github.png";
import qqImg from "./img/qq.png";
import wechatImg from "./img/wechat.png";
//引入样式
import "./index.less";
//引入正则表达式
import { userPhoneReg, userVerifyReg } from "../../regs/reg";
//引入ajax请求
import { getVerify, login } from "../../api/ajax";

export default class Login extends Component {
  state = {
    phone: "",
    verify: "",
    time: 10,
    isGetVerify: true,
  };
  render() {
    const { phone, verify, isGetVerify, time } = this.state;
    return (
      <div>
        <NavBar className="tit">手机验证码登录</NavBar>
        <List
          style={{
            "--prefix-width": "6em",
          }}
        >
          <List.Item prefix="手机号" className="user">
            <Input
              placeholder="请输入手机号"
              clearable
              onChange={this.phoneChange}
              value={phone}
            />
          </List.Item>
          <List.Item
            prefix="短信验证码"
            extra={
              <a
                onClick={this.getVerify}
                style={{ "--color": isGetVerify ? "" : "#666" }}
              >
                {isGetVerify ? "发送验证码" : "已发送" + time + "s"}
              </a>
            }
          >
            <Input
              placeholder="请输入验证码"
              clearable
              onChange={this.verifyChange}
              value={verify}
            />
          </List.Item>
        </List>
        <Button
          block
          color="primary"
          size="large"
          className="signBtn"
          onClick={this.login}
        >
          登录
        </Button>
        <div className="footer">
          <Divider>其他登录方式</Divider>
          <div>
            <img src={githubImg} alt="" />
            <img src={qqImg} alt="" />
            <img src={wechatImg} alt="" />
          </div>
          <p>小林家的小胡制作，如有雷同以小胡为主，嘎嘎嘎！</p>
        </div>
      </div>
    );
  }

  //让手机号输入框可控
  phoneChange = (e) => {
    this.setState({ phone: e });
  };

  //让验证码输入框可控
  verifyChange = (e) => {
    this.setState({ verify: e });
  };

  //点击发送验证码后
  getVerify = async () => {
    //对手机号就行判断和正则
    const { phone, isGetVerify } = this.state;
    let { time } = this.state;

    //判断是否允许发送验证码
    if (!isGetVerify) {
      Toast.show({
        icon: "fail",
        content: "发送验证码频繁",
      });
      return;
    }

    //如果手机号码不匹配则弹出轻提示
    if (!userPhoneReg.test(phone)) {
      Toast.show({
        icon: "fail",
        content: "请检查手机号",
      });
      return;
    }
    //如果手机号码匹配则发送获取验证码的ajax请求
    await getVerify(phone);

    //点击之后看门狗要变成false，直到10s后才变成true
    this.setState({ isGetVerify: false });

    //设置一个计时器，用来计时解开开关
    this.verifyTime = setInterval(() => {
      //设置state中time的最新值
      this.setState({ time: --time });

      //判断time临界值
      if (time <= 0) {
        //当time的时间小于等于0 则打开开关 并清掉计时器 并把时间继续设置为10
        this.setState({ isGetVerify: true, time: 10 });
        //每次重置都要先清除定时器
        clearInterval(this.verifyTime);
      }
    }, 1000);

    //否则验证码才发送成功
    Toast.show({
      icon: "success",
      content: "验证码发送成功",
    });
  };

  //点击登录后
  login = async () => {
    //对验证码就行判断和正则
    const { phone, verify } = this.state;
    //如果验证码不匹配则弹出轻提示
    if (!userVerifyReg.test(verify)) {
      Toast.show({
        icon: "fail",
        content: "请检查验证码",
      });
      return;
    }
    //如果验证码匹配则发送登录的ajax请求，并获得结果
    const loginResulte = await login(phone, verify);

    //判断获得的结果
    if (loginResulte.data.code !== 20000) {
      //验证码错误则登录失败
      Toast.show({
        icon: "fail",
        content: loginResulte.data.message,
      });
      return;
    }

    //验证码正确则跳转到个人中心页面
    this.props.history.push("/UserCenter");
  };

  //跳转页面组件将卸载，在卸载的时候清除定时器
  componentWillUnmount() {
    clearInterval(this.verifyTime);
  }
}
