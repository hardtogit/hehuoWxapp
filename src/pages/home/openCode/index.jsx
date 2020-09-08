

import Taro, { Component,useEffect,useState,useShareAppMessage,useRouter} from "@tarojs/taro";
import dayjs from 'dayjs'
import drawQrcode from 'weapp-qrcode'
import  network from '@/utils/network'
import {
  View,
  Button,
  Text,
  Canvas,
  Image,
  Swiper,
  SwiperItem
} from "@tarojs/components";


import "./index.scss";

export default function Index() {
  const [order,setOrder]=useState({})
  const router=useRouter()
  const [imgUrl,setImageurl] = useState('')
  useShareAppMessage(()=>{
        return {
          title:'开门码',
          path:`/pages/home/openCode/index?id=${router.params.id}`,
        }
  })
  useEffect(()=>{
    network.Fetch({
      "obj": "user",
      "act": "details_order",
      order_id:router.params.id
    }).then((res)=>{
      setOrder(res.order)
      drawQrcode({
        width: 160,
        height: 160,
        canvasId: 'myQrcode',
        text: router.params.id
      })
    })
  },[])
  return (
    <View className='openCode'>
      <View className='tip'>“开门码”可转发给好友使用 </View>
      <View className='tip'>点击右上角，选择“发送给好友”</View>
      <View className='content'>
        <View className='top'>
          <View className='title'>开门请出示</View>
            <canvas style='width: 160px; height: 160px;margin:20px auto' canvas-id='myQrcode'></canvas>
        </View>
        <View className='bottom'>
          <View className='item'>
            <View className='left'>包间名</View>
  <View className='right'>{order.room_name}</View>
          </View>
          <View className='item'>
            <View className='left'>地址</View>
  <View className='right'>{order.shop_name}</View>
          </View>
          <View className='item'>
            <View className='left'>电话</View>
  <View className='right'>{order.serve_phone}</View>
          </View>
          <View className='item'>
            <View className='left'>有效期</View>
  <View className='right'>
   {order.room_type=='时段价'?
    <Text>  {
    dayjs(order.service_time.begin_time*1000).format('YYYY.MM.DD HH:mm')
  }-{dayjs(order.service_time.end_time*1000).format('YYYY.MM.DD HH:mm')}
  </Text>:'一口价时段'}
  </View>
          </View>
        </View>

      </View>

      <View className='btn' onClick={()=>Taro.switchTab({url:'/pages/home/index'})}>
        回到首页
      </View>
    </View>)
}
Index.config = {
  navigationBarTitleText: '开门码',
  navigationBarBackgroundColor: '#00A0E9',
  navigationBarTextStyle: 'white'
}
