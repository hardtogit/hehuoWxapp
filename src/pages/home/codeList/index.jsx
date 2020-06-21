

import Taro, { Component } from "@tarojs/taro";
import {
    View,
    Button,
    Text,
    Image,
    Swiper,
    SwiperItem
} from "@tarojs/components";
import OrderItem from "../../../components/OrderItem";
import "./index.scss";

export default function Index() {
    return (
        <View className='openCode'>
            <View className='item'>
                <OrderItem />
            </View>
            <View className='item'>
                <OrderItem />
            </View>
            <View className='item'>
                <OrderItem />
            </View>
        </View>)
}
Index.config = {
    navigationBarTitleText: '开门码'
  }