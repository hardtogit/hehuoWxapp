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
      let result = data.list.map((item) => {
        return {
          ...item,
          count: 1, //默认选择0件
          selected: false,//是否选择
        }
      })
      if (this.props.xudan) {
        result = result.filter((item) => {
          return item.buyone !== 'true'
        })
      }
      this.props.goodsListStore.initListData(result)
      this.props.onGoodsList(result)//只是同步
    })
  }
  componentDidMount() {
    this.getGooods()
    this.timer = setInterval(() => {
      const { goodsList } = this.props.goodsListStore
      this.props.onGoodsList([...goodsList])
    }, 2000)
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }

  updateListData = (entity) => {
    // this.props.goodsListStore.updateListData(entity)
    const { goodsList } = this.props.goodsListStore
    const newGoodsList = goodsList.map((item) => {
      if (item._id === entity._id) {
        return {
          ...entity
        }
      }
      return item
    })
    console.log('his发酒疯')
    this.props.onGoodsList([...newGoodsList])
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
      <View>
        {
          goodsList.length !== 0 &&
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
                    <Goods entity={item} onUpdateListData={this.updateListData} goodsListStore={this.props.goodsListStore} />
                  )
                })}
              </View>
            </ScrollView>
          </View>
        }

      </View>
    )
  }
}
Index.config = {
  navigationBarTitleText: '确认订单'
}


