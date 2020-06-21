

import Taro, { Component } from "@tarojs/taro";
import {
  View,
  Button,
  Text,
  Image,
  Swiper,
  SwiperItem
} from "@tarojs/components";

import "./index.scss";

export default function Index() {
  return (
    <View className='openCode'>
      <View className='tip'>
        “开门码”可转发给好友使用 </View>
      <View className='tip'>点击右上角，选择“发送给好友”</View>
      <View className='content'>
        <View className='top'>
          <View className='title'>开门请出示</View>
          <View className='qrcode'></View>  
        </View>
        <View className='bottom'>
          <View className='item'>
            <View className='left'>包间名</View>
            <View className='right'>大黄峰</View>
          </View>
          <View className='item'>
            <View className='left'>地址</View>
            <View className='right'>大黄峰</View>
          </View>
          <View className='item'>
            <View className='left'>电话</View>
            <View className='right'>大黄峰</View>
          </View>
          <View className='item'>
            <View className='left'>有效期</View>
            <View className='right'>大黄峰</View>
          </View>
        </View>

      </View>
    </View>)
}
Index.config = {
  navigationBarTitleText: '开门码',
  navigationBarBackgroundColor: '#00A0E9',
  navigationBarTextStyle: 'white'
}