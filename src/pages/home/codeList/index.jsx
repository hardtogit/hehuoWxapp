

import Taro, { Component, useEffect, useState, useShareAppMessage, useRouter } from "@tarojs/taro";
import network from '@/utils/network'
import {
  View,
  Button,
  Text,
  Image,
  Swiper,
  SwiperItem
} from "@tarojs/components";
import GoHome from '@/components/GoHome'
import OrderItem from "../../../components/OrderItem";
import "./index.scss";

export default function Index() {
  const [empty, setEmpty] = useState(false)
  const [orders, setOrders] = useState([])
  const { params } = useRouter()
  useShareAppMessage({})
  useEffect(() => {
    network.Fetch({
      "obj": "user",
      "act": "list_order",
      status: '开门码',
      "page": 1,
      "limit": 100
    }).then((data) => {
      setOrders(data.list)
      if ((!data.list || data.list.length === 0)) {
        setEmpty(true)
      }
    })

  }, [])
  return (
    <View className='openCode'>
      {params.from !== 'map' && <GoHome />}
      {
        empty &&
        <View className='empty'>
          <Image className='emptyImg' src={require('../../../assets/img/no_data.png')}></Image>
          <View className='emptyText'>
            还没有已预约的订单
          </View>
        </View>
      }
      {orders.map((order) => {
        return (
          <View className='item'>
            <OrderItem order={order} type='openCode' />
          </View>
        )
      })}
    </View>)
}
Index.config = {
  navigationBarTitleText: '开门码'
}
