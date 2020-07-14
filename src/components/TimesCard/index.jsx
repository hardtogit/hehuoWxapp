import Taro, { Component ,useEffect,useState} from "@tarojs/taro";
import classNames from 'classnames'
import dayjs from 'dayjs'
import { View, Button, Text, WebView, Image} from "@tarojs/components";
import network from '../../utils/network'
import "./index.scss";


const Index = (props) => {
  const {card}=props
  return (
    <View className={classNames(['card',card.user_memb_stat=='未使用'&&'active'])}>
        <View className='top'>
          <View className='inner'>
            <View className='left'>
            <View className='title'>{card.memb_off_time}/次</View>
            <View className='time'>活动有效期：{dayjs(card.effective_time).format('YYYY.MM.DD')}-{dayjs(card.expire_time).format('YYYY.MM.DD')}</View>
            </View>
            {card.user_memb_stat=='未使用'&&
              <View className='btn' onClick={()=>Taro.navigateTo({
                url:`/pages/home/storeDetail/index?id=${card.shop_id}`
              })}>
              去使用
              </View>
            }
          </View>
          <View className='name'>
          限{card.shop_name}店使用
          </View>
        </View>

    </View>
  )
}

