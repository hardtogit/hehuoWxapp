import Taro, { Component ,useEffect} from "@tarojs/taro";
import { View, Button, Text, WebView, Image} from "@tarojs/components";
import network from '../../utils/network'
import "./index.scss";


const Index = () => {
  return (
    <View className='about'>
      <Image className='logo' src={require('../../../assets/img/home/right.png')}></Image>
      <View className='title'>恭喜您预约成功</View>
      <View className='btn active' onClick={()=>{
        Taro.navigateTo({url:'/pages/home/openCode/index'})
      }}>查看开门码</View>
      <View className='btn' onClick={()=>{
        Taro.switchTab({url:'/pages/home/index'})
      }}>返回首页</View>
    </View>
  )
}
Index.config = {
  navigationBarTitleText: '成功'
}

