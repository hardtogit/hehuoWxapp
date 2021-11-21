import Taro, { Component } from "@tarojs/taro";
import { Provider } from "@tarojs/mobx";
import network from './utils/http';
import Index from "./pages/index";

import counterStore from "./store/counter";
import userInfoStore from "./store/userInfo"
import listDataStore from "./store/listData"
import goodsListStore from './store/goodsList'


import "./app.scss";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }


network.apiconn.connect();

const store = {
  counterStore,
  userInfoStore,
  listDataStore,
  goodsListStore
};

class App extends Component {
  config = {
    pages: ["pages/home/index", "pages/col/index", "pages/order/index", "pages/me/index", "pages/login/index", "pages/phone/index", "pages/home/buyTimesCard/index", "pages/home/selectTimeCard/index", "pages/home/selectCoupon/index", "pages/home/appointment/index", "pages/home/appointmentCopy/index", "pages/home/buyCoupon/index", "pages/home/storeDetail/index", "pages/home/roomDetail/index", "pages/home/map/index", "pages/home/codeList/index", "pages/home/openCode/index", "pages/me/wallet/index", "pages/me/recharge/index", "pages/me/coupon/index", "pages/me/info/index", "pages/me/bindPhone/index", "pages/me/about/index", "pages/me/problem/index", "pages/me/apply/index", "pages/me/timesCard/index", "pages/me/record/index", "pages/home/sureOrder/index", "pages/home/success/index", "pages/home/storeList/index", "pages/home/continueList/index", "pages/home/continueOrder/index", "pages/home/continueAppointment/index", "pages/home/doc/index", "pages/home/web/index", "pages/home/text/index", "pages/home/city/index", "pages/home/goods/index", "pages/me/mine/index", "pages/order/order/index", "pages/col/col/index"],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "WeChat",
      navigationBarTextStyle: "black"
    },
    "permission": {
      "scope.userLocation": {
        "desc": "你的位置信息将用于为您提供便捷服务" // 高速公路行驶持续后台定位
      }
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
        selectedIconPath: "assets/img/colH.png",
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

  componentDidMount() {
    Taro.requestSubscribeMessage({
      tmplIds: ['IJpLmPETjSPBTBqPoZMmg_At0iqsFRPWYWgRHr0A86M'],
      success(res) {
        console.log(res)
      }
    })
  }
  // componentDidShow(){
  //   network.apiconn.connect();
  //   console.log('重连了')
  // }

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
