import Taro, { Component ,useEffect,useState} from "@tarojs/taro";
import classNames from 'classnames'
import { View, Button, Text, WebView, Image} from "@tarojs/components";
import network from '../../utils/network'
import "./index.scss";


const Index = (props) => {
  const {timeCard,shop_id}=props
  const buy=()=>{
    network.Fetch({
      "obj":"user",
		"act":"add_card_user",
		"memb_id":timeCard._id,
		"shop_id":shop_id||'o15935343187253150939'
    }).then(()=>{
      Taro.showToast({
        title:'购买成功',
        icon:'none'
      })
      setTimeout(()=>{
        Taro.navigateBack({})
      },1000)
    })
  }
  return (
    <View className='card '>
        <View className='top'>
          <View className='inner'>
            <View className='left'>
            <View className='title'>{timeCard.memb_off_time}/次 {timeCard.memb_purchase_times} 即赠 {timeCard.memb_discounts_times}使用卷</View>
            <View className='time'>活动有效期：{`${timeCard.effective_time}-${timeCard.expire_time}`}</View>
            </View>
          </View>
          <View className='bottom'>
            <View className='price'>
              880
            </View>
            <View className='btn' onClick={buy}>
              立即购买
            </View>

          </View>
        </View>

    </View>
  )
}

