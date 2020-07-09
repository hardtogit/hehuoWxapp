import Taro, { Component } from "@tarojs/taro";
import classNames from 'classnames'
import { AtFloatLayout } from 'taro-ui'
import { View, Button, Text } from "@tarojs/components";
import "./index.scss";



const Index = (props) => {
  const {use,timeout}=props
  return (
    <AtFloatLayout isOpened={true} onClick={() => this.setState({ visibleHelp:false})}>
    <View className={classNames(['coupon',use&&'use',timeout&&'timeout'])}>
      <View className='left'>
        <View className='num'>
          <View className='unit'>¥</View> 60
        </View>
        <View className='text'>
          无门槛
        </View>
      </View>
      <View className='center'>
        <View className='title'> 平台优惠券</View>
        <View className='time'> 有效期：2020.05.11-2020.05.12 </View>
      </View>
      <View className='right'>
        <View className='btn'>领取</View>
      </View>
    </View>
    </AtFloatLayout>
  )
}
Index.config = {
  navigationBarTitleText: '首页'
}


