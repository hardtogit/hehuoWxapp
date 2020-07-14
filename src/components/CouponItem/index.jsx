import Taro, { Component } from "@tarojs/taro";
import classNames from 'classnames'
import dayjs from 'dayjs'
import { View, Button, Text } from "@tarojs/components";
import "./index.scss";

const Index = (props) => {
  const {coupon,status}=props
  const use=status==='已使用'
  const timeout=status==='已过期'
  return (
    <View className={classNames(['coupon',use&&'use',timeout&&'timeout'])}>
      <View className='left'>
        <View className='num'>
          <View className='unit'>¥</View>
          {coupon.disc_off_price}
        </View>
        <View className='text'>
        {coupon.disc_use_price?`满${coupon.disc_use_price}可用`:'无门槛'}
        </View>
      </View>
      <View className='center'>
      <View className='title'> {coupon.disc_name}</View>
              <View className='time'> 有效期：{dayjs(coupon.effective_time*1000).format('YYYY.MM.DD')}-{dayjs(coupon.expire_time*1000).format('YYYY.MM.DD')}</View>
      </View>
      <View className='right'>
        {status=='未使用'&& <View className='btn'>去使用</View>}
        {status=='未领取'&& <View className='btn'>领取</View>}
      </View>
    </View>
  )
}
Index.config = {
  navigationBarTitleText: '首页'
}


