import Taro, { Component, useState, useRouter, useEffect, useDidShow } from "@tarojs/taro";
import { inject, observer } from '@tarojs/mobx'
import network from '@/utils/network'
import { computeNumber } from '@/utils'
import { View, Image, ScrollView } from "@tarojs/components";
import Goods from '../goods'
import "./index.scss";



@inject('goodsListStore')
@observer
class Index extends Component {
  getGooods = () => {
    network.Fetch({
      "obj": "user",
      "act": "list_goods",
      "room_id": this.props.room_id || 'o15956083697860679626'
    }).then((data) => {
      const result = data.list.map((item) => {
        return {
          ...item,
          count: 0, //默认选择0件
          selected: false,//是否选择
        }

      })
      this.props.goodsListStore.initListData(result)
      this.props.onGoodsList(result)//只是同步
    })
  }
  componentDidMount() {
    this.getGooods()
  }
  componentWillReceiveProps(nextProps) {
    console.log('sgfkasgfsagfksgfkkkkkk')
    // console.log(nextProps,'faaaaaa')
    // this.props.onGoodsList(nextProps.goodsListStore.goodsList)//只是同步
  }
  updateListData = (entity) => {
    this.props.goodsListStore.updateListData(entity)
  }
  render() {
    const { goodsList } = this.props.goodsListStore
    const saveMoney = goodsList.reduce((total, current) => {
      console.log(current, total, 'nihasd')
      if (current.ori_price && current.selected) {
        return computeNumber(current.ori_price, '-', current.price).next('*', current.count).next('+', total).result
      } else {
        return total
      }
    }, 0)
    return (
      <View className='four card'>
        <View className='title'>
          <View className='left'>
            <Image className='icon' src={require('../../../../../assets/img/home/goods_yes.png')}></Image>
            <View className='name'>为您推荐</View>
            <View className='subName'>
              (商品为您节省{saveMoney}元)
            </View>
          </View>
          <View className='right' onClick={() => Taro.navigateTo({ url: '/pages/home/goods/index' })}>
            更多商品<Image className='icon' src={require('../../../../../assets/img/home/goods_arrow.png')}></Image>
          </View>
        </View>
        <ScrollView scrollX className='goodsContainer'>
          <View className='inner'>
            {goodsList.map((item) => {
              return (
                <Goods entity={item} goodsListStore={this.props.goodsListStore} />
              )
            })}
          </View>
        </ScrollView>
      </View>
    )
  }
}
Index.config = {
  navigationBarTitleText: '确认订单'
}


