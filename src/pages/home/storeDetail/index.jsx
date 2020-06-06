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
        <View className='address'>
          <View className='text'> 上海市接单工业路中央第五街1楼22层22室</View>
          <View className='icon'></View>
        </View>
        <View className='labels'>
          <View className='label'>投影仪</View>
          <View className='label'>充电宝</View>
        </View>


        <View className='rooms'>
          <View className='item_title'>
            所有空间
          </View>
          <RoomItem></RoomItem>

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
