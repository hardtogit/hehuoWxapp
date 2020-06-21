import Taro, { Component, useEffect, useDidShow, useState } from "@tarojs/taro";
import { View, Button, Text, WebView, Image } from "@tarojs/components";
import network from '@/utils/network'
import "./index.scss";


const Index = () => {
  const [person, setPerson] = useState({})
  useDidShow(() => {
    network.Fetch({
      "obj": "user",
      "act": "get_personal"
    }).then((data) => {
      setPerson(data.personal)
    })


  }, [])
  return (
    <View className='me'>
      <View className='header'>
        <View className='top'>
          <View className='cover'>
            <Image className='img' src={person.avatar_fid}></Image>
            <View className='edit' onClick={()=>Taro.navigateTo({url:'/pages/me/info/index'})}>编辑</View>
          </View>
          <View className='name'>{person.nickname}</View>
        </View>
        <View className='bottom'>
          <View className='item' onClick={()=>Taro.navigateTo({url:'/pages/me/coupon/index'})}>
            <View className='num'>22</View>
            <View className='text'>优惠券</View>
          </View>
          <View className='item' onClick={() => Taro.navigateTo({ url: '/pages/me/wallet/index' })}>
            <View className='num'>22</View>
            <View className='text'>钱包</View>
          </View>
          <View className='item'>
            <View className='num'>22</View>
            <View className='text'>积分</View>
          </View>
        </View>
      </View>
      <View className='funs'>
        <View className='item'>
          <View className='fun'>
            <Image className='img' src={require('../../assets/img/me/me1.png')}></Image>
            <View className='text'>
              优惠次卡
             </View>
          </View>
          <View className='fun two'>
            <Image className='img' src={require('../../assets/img/me/me2.png')}></Image>
            <View className='text'>
              加盟合作
             </View>
          </View>
          <View className='fun'>
            <Image className='img' src={require('../../assets/img/me/me3.png')}></Image>
            <View className='text'>
              商城
             </View>
          </View>
        </View>
        <View className='item two' >
          <View className='fun' onClick={()=>Taro.navigateTo({url:'/pages/me/about/index'})}>
            <Image className='img' src={require('../../assets/img/me/me4.png')}></Image>
            <View className='text'>
              关于我们
             </View>
          </View>
          <View className='fun' onClick={()=>{Taro.makePhoneCall({phoneNumber:'15528059522'})}}>
            <Image className='img' src={require('../../assets/img/me/me5.png')}></Image>
            <View className='text'>
              联系我们
             </View>
          </View>
          <View className='fun'>
            <Image className='img' src={require('../../assets/img/me/me6.png')}></Image>
            <View className='text'>
              常见问题
             </View>
          </View>
        </View>
      </View>
    </View>
  )
}
Index.config = {
  navigationBarTitleText: '我的'
}


