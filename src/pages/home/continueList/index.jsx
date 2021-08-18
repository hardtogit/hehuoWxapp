

import Taro, { Component, useEffect, useState, useShareAppMessage, useRouter } from "@tarojs/taro";
import network from '@/utils/network'
import {
  View
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
  } s
  render() {
    const { continueList } = this.props.listDataStore
    return (
      <View className='openCode' >
        <GoHome />
        <ListTemplate preLoad={false} listDataKey='continueList'
          ref={(listRef) => this.listRef = listRef}
          emptyText="您没有可续约的订单"
          fetchFn={(params) =>
            network.Fetch({
              "obj": "user",
              "act": "list_order",
              status: '续单',
              ...params
            })
          }
        >
          {continueList.map((order) => {
            return (
              <View className='item'>
                <OrderItem order={order} type='continue' />
              </View>
            )
          })}

        </ListTemplate>
      </View>)
  }


}



Index.config = {
  navigationBarTitleText: '我要续单'
}
