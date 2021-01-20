import Taro, { Component, useEffect, useDidShow, useState } from "@tarojs/taro";
import { View, Button, Text, WebView, Image } from "@tarojs/components";
import {AtModal,AtActionSheet,AtActionSheetItem} from 'taro-ui'
import network from '@/utils/network'
import "./index.scss";


const Index = () => {
  const [person, setPerson] = useState({})
  const [data, setData] = useState({})
  const [visiblePhone,setVisiblePhone]=useState(false)
  const [visible, setVisible] = useState(false)
  useEffect(()=>{
    network.Fetch({
      "obj": "user",
      "act": "contact_us"
    }).then((a) => {
        setData(a)
    })
  },[])

  useDidShow(() => {
    network.Fetch({
      "obj": "user",
      "act": "get_personal"
    }).then((data) => {
      setPerson(data.personal)
      const userInfo=Taro.getStorageSync('userInfo')
      Taro.setStorageSync('userInfo',{...userInfo,...data.personal})
    })


  }, [])
  return (
    <View className='me'>
      <AtModal
        isOpened={visible}
        title='提示'
        confirmText='确定'
        onClose={()=>setVisible(false)}
        onConfirm={()=>setVisible(false)}
        content='正在开发中，请耐心等待...'
      />
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
  <View className='num'>{person.disc_count}</View>
            <View className='text'>优惠券</View>
          </View>
          <View className='item' onClick={() => Taro.navigateTo({ url: '/pages/me/wallet/index' })}>
  <View className='num'>{parseFloat(person.balance||0).toFixed(2)}</View>
            <View className='text'>钱包</View>
          </View>
          <View className='item'>
  <View className='num'>{person.integral}</View>
            <View className='text'>积分</View>
          </View>
        </View>
      </View>
      <View className='funs'>
        <View className='item'>
          <View className='fun' onClick={()=>Taro.navigateTo({url:'/pages/me/timesCard/index'})}>
            <Image className='img' src={require('../../assets/img/me/me1.png')} ></Image>
            <View className='text'>
              优惠次卡
             </View>
          </View>
          <View className='fun two' onClick={()=>Taro.navigateTo({url:'/pages/me/apply/index'})}>
            <Image className='img' src={require('../../assets/img/me/me2.png')}></Image>
            <View className='text'>
              加盟合作
             </View>
          </View>
          <View className='fun' onClick={()=>{
              Taro.navigateToMiniProgram({
                appId: "wxbe533391dbad496b",
                path: "/pages/index/index",
              })
          }
          }
          >
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
          <View className='fun' onClick={()=>setVisiblePhone(true)}>
            <Image className='img' src={require('../../assets/img/me/me5.png')}></Image>
            <View className='text'>
              联系我们
             </View>
          </View>
          <View className='fun' onClick={()=>Taro.navigateTo({url:'/pages/me/problem/index'})}>
            <Image className='img' src={require('../../assets/img/me/me6.png')}></Image>
            <View className='text'>
              常见问题
             </View>
          </View>
        </View>
      </View>
      <AtActionSheet isOpened={visiblePhone} cancelText='取消' onClose={()=>setVisiblePhone(false)} >
        <AtActionSheetItem>
          {data.platform_phone}
        </AtActionSheetItem>
        <AtActionSheetItem  onClick={()=>{Taro.makePhoneCall({phoneNumber:''+data.platform_phone})}}>
          呼叫
        </AtActionSheetItem>
          </AtActionSheet>

    </View>
  )
}
Index.config = {
  navigationBarTitleText: '我的'
}


