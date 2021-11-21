import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Map, Input, Image, CoverView, CoverImage } from "@tarojs/components";
import { inject, observer } from '@tarojs/mobx'
import Goods from './components/goods'
import './index.scss'


@inject('goodsListStore')
@observer
class Index extends Component {
  render() {
    const { goodsList } = this.props.goodsListStore
    return (
      <View className='goods'>
        <View className='title'>
          boss 提前为您在空间摆放好吗？
        </View>
        <View className='tip'>
          温馨提示：茶室内有存茶柜，专门为您放置茶叶。
        </View>
        {goodsList.map((item) => {
          return (
            <Goods entity={item} goodsListStore={this.props.goodsListStore} />
          )
        })}
        <View className='btn' onClick={() => { Taro.navigateBack() }}>
          返回
        </View>
      </View>
    )
  }
}
Index.config = {
  navigationBarTitleText: '为您推荐',
  navigationBarBackgroundColor: '#02a1fd',
  navigationBarTextStyle: 'white'
}
export default Index
