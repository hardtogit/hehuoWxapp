import Taro, { Component ,useEffect} from "@tarojs/taro";
import { View, Button, Text, WebView, Image} from "@tarojs/components";
import network from '../../utils/network'
import "./index.scss";


const Index = () => {
  return (
    <View className='about'>
      <Image className='logo' src={require('../../../assets/img/me/logo.png')}></Image>
      <View className='title'>软件介绍：</View>
      <View className='content'>

      胜多负少的里看风景时口袋里烦死了的框架福克斯来得及发是考虑到非就开始了电脑卡死来得及付款蓝色方让肌肤卡死了记分考试老家发大水开两年福利卡看风景开始锻炼房间你，富士康京东方抗裂砂浆福克纳。烦死了的框架付款了房间里卡萨诺法是跌幅为，上岛咖啡金额为看雷锋接口是否撒旦法饿。
是来看待记分考试的富士康的飞就开始上看到机房课。

                            
      </View>
    </View>
  )
}
Index.config = {
  navigationBarTitleText: '登陆'
}


