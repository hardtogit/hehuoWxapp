

import Taro, { Component, useEffect, useState, useRouter } from "@tarojs/taro";
import network from '@/utils/network'
import {
  View,
  Button,
  Text,
  Image,
  Swiper,
  SwiperItem
} from "@tarojs/components";
import OrderItem from "../../../components/TeaCard";
import "./index.scss";

export default function Index() {
  const [empty, setEmpty] = useState(false)
  const [orders, setOrders] = useState([])
  const router = useRouter()
  useEffect(() => {
    network.Fetch({
      "obj": "user",
      "act": "find_nearby_shop",
      latitude: router.params.latitude,
      longitude: router.params.longitude,
      locallatitude: Taro.getStorageSync('myLocation').lat,
      locallongitude: Taro.getStorageSync('myLocation').lng,

    }).then((data) => {
      setOrders(data.list)
      if ((!data.list || data.list.length === 0)) {
        setEmpty(true)
      }
    })

  }, [])
  return (
    <View className='openCode'>
      {orders.map((order) => {
        return (
          <View className='item'>
            <OrderItem tea={order} />
          </View>
        )
      })}
    </View>)
}
Index.config = {
  navigationBarTitleText: '周边店铺'
}
