import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import ColItem from '@/components/ColItem'
import "./index.scss";


export default function Index(){
  return(
    <View className='col'>
         <ColItem/> 
         <ColItem/> 
         <ColItem/> 
         <ColItem/> 
         <ColItem/> 
    </View>
  )
} 
Index.config = {
  navigationBarTitleText: '我的收藏'
}


