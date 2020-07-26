import Taro, { Component,useEffect,useState,useRouter} from "@tarojs/taro";
import classNames from 'classnames'
import network from '@/utils/network'
import dayjs from 'dayjs'
import TimesCardBuy from '@/components/TimesCardBuy'
import {AtFloatLayout} from 'taro-ui'
import { View, Button, Text,Image } from "@tarojs/components";
import "./index.scss";



export default (props) => {
  const {onCancel,visible,timeCards,shop_id}=props
  const [coupons,setCoupons]=useState([])
  return (
    <AtFloatLayout isOpened={visible} >
      <View className='modal'>
       <View className='header'>
         <View className='left'>优惠次卡</View>
          <View className='right' onClick={onCancel}>X</View>
       </View>
            {
        timeCards.length===0&&
        <View className='empty'>
        <Image  className='emptyImg' src={require('../../../../../assets/img/no_data.png')}></Image>
        <View className='emptyText'>
          暂无优惠活动
        </View>
      </View>
      }
           {timeCards.map((timeCard)=>{
                  return(
                    <TimesCardBuy timeCard={timeCard} shop_id={shop_id}></TimesCardBuy>
                  )
             })}

      <View className='btns' onClick={onCancel}>
         确认
      </View>
      </View>
    </AtFloatLayout>
  )
}


