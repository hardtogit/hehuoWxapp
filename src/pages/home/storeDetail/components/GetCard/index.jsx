import Taro, { Component, useEffect, useState, useRouter } from "@tarojs/taro";
import classNames from 'classnames'
import network from '@/utils/network'
import dayjs from 'dayjs'
import TimesCardBuy from '@/components/TimesCardBuy'
import ChoicePayType from '@/components/ChoicePayType'
import laba from '@/assets/img/home/laba.png'
import { AtFloatLayout } from 'taro-ui'
import { View, ScrollView, Image } from "@tarojs/components";
import "./index.scss";



export default (props) => {
  const { onCancel, visible, timeCards, shop_id, openPay } = props
  const [coupons, setCoupons] = useState([])
  return (
    <View className='getCard'>
      <AtFloatLayout isOpened={visible} onClose={onCancel}>
        <View className='modal'>
          <View className='header' onClick={onCancel}>

            <View className='left'><Image className='icon' src={laba} />VIP会员活动</View>
            <Image className='right' src={require('../../../../../assets/img/home/close.png')} ></Image>
          </View>
          {
            timeCards.length === 0 &&
            <View className='empty'>
              <Image className='emptyImg' src={require('../../../../../assets/img/no_data.png')}></Image>
              <View className='emptyText'>
                暂无优惠活动
              </View>
            </View>
          }
          <ScrollView scrollY={true} className='all'>
            <View className='cardContainer'>
              {timeCards.map((timeCard) => {
                return (

                  <TimesCardBuy timeCard={timeCard} shop_id={shop_id} openPay={openPay}></TimesCardBuy>

                )
              })}
              <View className='tip'>*不可与优惠券叠加使用</View>
            </View>
          </ScrollView>

          <View className='btns' onClick={onCancel}>
            <View className='btn'>
              确认
            </View>
          </View>
        </View>
      </AtFloatLayout>
    </View>
  )
}


