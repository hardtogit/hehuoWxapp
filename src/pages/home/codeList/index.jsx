

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
import { inject, observer } from '@tarojs/mobx'
import ListTemplate from '@/components/ListTemplate'
import OrderItem from "../../../components/OrderItem";
import "./index.scss";
@inject('listDataStore')
@observer
class Index extends Component {
  constructor() {

  }
  onShareAppMessage() { }
  componentDidShow() {

    this.listRef && this.listRef.initLoad()
  }
  componentDidMount() {
    this.listRef.initLoad()
  }
  onReachBottom() {
    this.listRef.getData()
  }
  render() {
    const { codeList } = this.props.listDataStore
    return (
      <View className='openCode' >
        <GoHome />
        <ListTemplate preLoad={false} listDataKey='codeList'
          ref={(listRef) => this.listRef = listRef}
          emptyText="还没有已预约的订单"
          fetchFn={(params) =>
            network.Fetch({
              "obj": "user",
              "act": "list_order",
              status: '开门码',
              ...params
            })
          }
        >
          {codeList.map((order) => {
            return (
              <View className='item'>
                <OrderItem order={order} type='openCode' />
              </View>
            )
          })}
        </ListTemplate>
      </View>)
  }


}



Index.config = {
  navigationBarTitleText: '开门码'
}
