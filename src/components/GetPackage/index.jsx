import Taro, { Component, useEffect, useState, useRouter } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import { AtFloatLayout } from 'taro-ui'
import classNames from 'classnames'
import network from '@/utils/network'
import dayjs from 'dayjs'
import laba from '@/assets/img/home/laba.png'
import PackageCard from '../PackageCard'

import "./index.scss";



export default (props) => {
  const { onCancel, visible, timeCards, shop_id, openPay } = props
  const [coupons, setCoupons] = useState([])
  return (
    <View className='getTeaArt'>
      <AtFloatLayout isOpened={visible} onClose={onCancel}>
        <View className='modal'>
          <View className='header' onClick={onCancel}>
            <View className='left'><Image className='icon' src={laba} /> 为你推荐套餐，蓝色为已选中</View>
          </View>
          <ScrollView scrollY={true} className='all'>
            <PackageCard />
            <PackageCard />
            <PackageCard />
            <PackageCard />
            <PackageCard />
          </ScrollView>
          <View className='btns'>
            <View className='btn' onClick={onCancel}>
              返回
            </View>
          </View>
        </View>
      </AtFloatLayout>
    </View>
  )
}


