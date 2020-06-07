import Taro, { Component } from "@tarojs/taro";
import { Provider } from "@tarojs/mobx";
import network from './utils/network';
import Index from "./pages/index";

import counterStore from "./store/counter";

import "./app.scss";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }


network.apiconn.connect();

const store = {
  counterStore
};

class App extends Component {
  config = {
    pages: ["pages/home/index", "pages/col/index", "pages/order/index", "pages/me/index","pages/login/index", "pages/home/storeDetail/index","pages/me/wallet/index","pages/me/recharge/index","pages/me/coupon/index","pages/me/info/index"],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "WeChat",
      navigationBarTextStyle: "black"
    },
    tabBar: {
      color: "#C0C4CC",
      selectedColor: "#004da0",
      borderStyle: "black",
      backgroundColor: "#ffffff",
      list: [{
        pagePath: "pages/home/index",
        iconPath: "./assets/img/home.png",
        selectedIconPath: "assets/img/homeH.png",
        text: "首页" 
      },
      {
        pagePath: "pages/order/index",
        iconPath: "assets/img/order.png",
        selectedIconPath: "assets/img/orderH.png",
        text: "订单"
      },
      {
        pagePath: "pages/col/index",
        iconPath: "assets/img/col.png",
        selectedIconPath: "assets/img/col.png",
        text: "收藏"
      },
      {
        pagePath: "pages/me/index",
        iconPath: "assets/img/me.png",
        selectedIconPath: "assets/img/meH.png",
        text: "我的"
      }
      ]
    },
  };

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
