import Taro, { Component } from "@tarojs/taro";
import classNames from 'classnames'
import dayjs from 'dayjs'
import {AtFloatLayout} from 'taro-ui'
import { View, Button, Text } from "@tarojs/components";
import "./index.scss";



export default (props) => {
  const {use,timeout,visible,coupons,onCancel,getCouponFn}=props
  return (
    <AtFloatLayout isOpened={visible}>
      <View className='bar'>
        <Text className='label'>优惠券</Text>
        <Text className='close'  onClick={onCancel}>X</Text>
      </View>
      {coupons.map((coupon)=>{
        return(
          <View className={classNames(['coupon',use&&'use',timeout&&'timeout'])}>
          <View className='left'>
            <View className='num'>
              <View className='unit'>¥</View> 60
            </View>
            <View className='text'>
              {coupon.disc_use_price?`满${coupon.disc_use_price}可用`:'无门槛'}
            </View>
          </View>
          <View className='center'>
        <View className='title'> {coupon.disc_name}</View>
        <View className='time'> 有效期：{dayjs(coupon.effective_time).format('YYYY.MM.DD')}-{dayjs(coupon.expire_time).format('YYYY.MM.DD')}</View>
          </View>
          <View className='right'>
            <View className='btn' onClick={()=>getCouponFn(coupon._id)}>领取</View>
          </View>
        </View>
        )
      })}

    </AtFloatLayout>
  )
}


