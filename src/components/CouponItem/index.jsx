import Taro, { Component } from "@tarojs/taro";
import classNames from 'classnames'
import network from '@/utils/network'
import dayjs from 'dayjs'
import { View, Button, Text } from "@tarojs/components";
import "./index.scss";

const Index = (props) => {
  const { coupon, status, reLoad } = props
  const use = status === '已使用'
  const timeout = status === '已过期'
  const getCouponFn = (disc_id) => {
    // Taro.showLoading({
    //   title:''
    // })
    network.Fetch({
      "obj": "user",
      "act": "add_discounts",
      "disc_id": disc_id,
      "shop_id": coupon.shop_id,
    }).then(() => {
      reLoad()
      Taro.showToast({
        title: '领取成功',
        icon: 'none'
      })
    })
  }


  return (
    <View className={classNames(['coupon', use && 'use', timeout && 'timeout'])}>
      <View className='left'>
        <View className='num'>
          <View className='unit'>¥</View>
          {coupon.disc_off_price}
        </View>
        <View className='text'>
          {coupon.disc_use_price ? `满${coupon.disc_use_price}可用` : '无门槛'}
        </View>
      </View>
      <View className='center'>
        <View className='title'> {coupon.disc_name}</View>
        <View className='time'>
          {status === '未领取' ? `领取后有效期：${coupon.days}天` :
            ` 有效期：${dayjs(coupon.effective_time * 1000).format('YYYY.MM.DD')}-${dayjs(coupon.expire_time * 1000).format('YYYY.MM.DD')}`
          }
        </View>
        <View className='time'> {status == '未使用' && <Text style={{ marginRight: '10px' }}> 剩余次数：{coupon.owned_number}</Text>}类型：{coupon.create_type === 'admin' ? '平台' : '商户'}</View>
        <View className='time'>
          限{coupon.shop_name}使用
        </View>
      </View>
      <View className='right'>
        {status == '未使用' && <View className='btn' onClick={() => Taro.navigateTo({ url: `/pages/home/storeDetail/index?id=${coupon.shop_id}` })}>去使用</View>}
        {status == '未领取' && <View className='btn' onClick={() => getCouponFn(coupon._id)}>领取</View>}
      </View>
    </View>
  )
}
Index.config = {
  navigationBarTitleText: '首页'
}


