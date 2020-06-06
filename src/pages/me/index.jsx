import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text, WebView} from "@tarojs/components";
import "./index.scss";


const Index= ()=>{

  return(
    <WebView src='http://webxr-qa.doctorwork.com/rapp/health-baas/bindPhone'>

    </WebView>
  )
}
Index.config = {
  navigationBarTitleText: '首页'
}


