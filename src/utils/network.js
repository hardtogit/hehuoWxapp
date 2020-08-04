import Taro from "@tarojs/taro"
import qs from "qs"

const requestUrl = "http://47.114.62.134:51718/ckj2_http";
let loginFlag=false
const Fetch = params => {
  params=encodeURI(JSON.stringify({sess:wx.getStorageSync('sess'),...params}))
  console.log(params)
  return new Promise((resolve, reject) => {
      Taro.request({
        url:requestUrl+'?'+params,
        // data:params,
        method:'GET',
      }).then((data)=>{
        if (data.data.ustr) {
          reject(data.data)
          if(data.data.ustr=="未登录"){
            if(loginFlag==false){
              Taro.navigateTo({
                url:'/pages/login/index'
              })
              loginFlag=true
              setTimeout(()=>{
                 loginFlag=false
              },3000)
              return
            }
          }
          Taro.showToast({ icon: "none", title: data.data.ustr });
        }
          resolve(data.data)
      })
  });
};

export default {
  // apiconn,
  Fetch
};
