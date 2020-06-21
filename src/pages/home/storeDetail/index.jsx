import Taro, { Component } from "@tarojs/taro";
import {
  View,
  Button,
  Text,
  Image,
  Swiper,
  SwiperItem
} from "@tarojs/components";
import RoomItem from "../../../components/RoomItem";
import "./index.scss";

export default function Index() {
  return (
    <View className='store_detail'>
      <View className='swiper_container'>
        <Swiper
          className='swiper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay
        >
          <SwiperItem>
            <Image
              className='slide'
              src={require("../../../assets/img/home/fn_one.png")}
            ></Image>
          </SwiperItem>
          <SwiperItem>
            <Image
              className='slide'
              src={require("../../../assets/img/home/fn_one.png")}
            ></Image>
          </SwiperItem>
          <SwiperItem>
            <Image
              className='slide'
              src={require("../../../assets/img/home/fn_one.png")}
            ></Image>
          </SwiperItem>
        </Swiper>
      </View>
      <View className='content'>
        <View className='title'>茶空间|智能测试</View>
        <View className='address' onClick={()=>Taro.openLocation({})}>
          <View className='text'> 
          <View>上海市接单工业路中央第五街1楼22层22室</View>
          <View>距离您有2km</View>
          </View>
          <View className='icon'>
            <Image className='img' src={require('../../../assets/img/home/location_icon.png')}></Image>
          </View>
        </View>
        <View className='labels'>
          <View className='label'>投影仪</View>
          <View className='label'>充电宝</View>
        </View>

        <View className='bar one'>
          <Image className='left' src={require('../../../assets/img/home/item_one.png')}></Image>
          <View className='center'>限时优惠折扣</View>
          <View className='text'>我要领取</View> 
          <Image className='arrow' src={require('../../../assets/img/home/right_one.png')}></Image>
        </View>
        <View className='bar two'>
        <Image className='left' src={require('../../../assets/img/home/item_two.png')}></Image>
          <View className='center'>次卡优惠购买</View>
          <View className='text'>我要领取</View> 
          <Image className='arrow' src={require('../../../assets/img/home/right_two.png')}></Image>
        </View>

        <View className='rooms'>
          <View className='item_title'>
            所有空间
          </View>
          <RoomItem/>
          <RoomItem/>
          <RoomItem/>
          <RoomItem/>
        </View>
      </View>

      <View className='discription'>
          <View className='sub_title'>
              使用说明：
          </View>

        </View>

        <View className='bottom'>

        </View>

    </View>
  );
}
