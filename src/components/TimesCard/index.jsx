import Taro, { Component, useEffect, useState } from "@tarojs/taro";
import classNames from 'classnames'
import dayjs from 'dayjs'
import { View, Button, Text, WebView, Image } from "@tarojs/components";
import network from '../../utils/network'
import "./index.scss";


const Index = (props) => {
  const { card } = props
  return (
    <View className={classNames(['card', card.user_memb_stat == '未使用' && 'active'])}>
      <View className='top'>
        <View className='inner'>
          <View className='left'>
            <View className='title'>{card.memb_off_time}小时/次<View className='time'>剩余次数：{card.owned_number}</View></View>
            <View className='time'>活动有效期：{dayjs(card.effective_time * 1000).format('YYYY.MM.DD')}-{dayjs(card.expire_time * 1000).format('YYYY.MM.DD')}</View>
            <View className='time' style={{ display: 'flex', }}>
              <View style={{ flexShrink: 0 }}>活动说明：</View><View >{card.comment ? card.comment : '一起开启您的美好时光...'}</View>
            </View>
          </View>
          {card.user_memb_stat == '未使用' &&
            <View className='btn' onClick={() => Taro.navigateTo({
              url: `/pages/home/storeDetail/index?id=${card.shop_id}`
            })}
            >
              去使用
            </View>
          }
        </View>
        <View className='name'>
          限{card.shop_name}使用
        </View>
      </View>

    </View>
  )
}

