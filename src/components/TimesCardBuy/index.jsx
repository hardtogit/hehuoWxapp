import Taro, { Component ,useEffect,useState} from "@tarojs/taro";
import classNames from 'classnames'
import { View, Button, Text, WebView, Image} from "@tarojs/components";
import dayjs from 'dayjs'
import ChoicePayType from '@/components/ChoicePayType'
import network from '../../utils/network'
import "./index.scss";


const Index = (props) => {
  const {timeCard,shop_id,openPay}=props
  const [visible,setVisible]=useState(false)
  const buy=(payment_type)=>{
    network.Fetch({
    "obj":"user",
		"act":"add_card_user",
		"memb_id":timeCard._id,
    "shop_id":shop_id||'o15935343187253150939',
     payment_type
    }).then((data)=>{
      setVisible(false)
      Taro.requestPayment({
        ...data.pay_info,
        success:function(){
          Taro.showToast({
            title:'购买成功',
            icon:'none'
          })
          setTimeout(()=>{
            Taro.navigateBack({})
          },1000)
        }
      })


    })
  }
  return (
    <View>
   {visible&&<ChoicePayType onOk={buy} price={timeCard.memb_price} onCancel={()=>{setVisible(false)}}></ChoicePayType>}
    <View className='card '>
        <View className='top'>
          <View className='inner'>
            <View className='left'>
             <View className='title'>{timeCard.memb_name}</View>
            <View className='time'>活动有效期：{`${dayjs(timeCard.effective_time*1000).format('YYYY.MM.DD')}-${dayjs(timeCard.expire_time*1000).format('YYYY.MM.DD')}`}</View>
            </View>
          </View>
          <View className='bottom'>
            <View className='price'>
              {timeCard.memb_price}
            </View>
            <View className='btn' onClick={()=>openPay(timeCard)}>
              立即购买
            </View>
          </View>
        </View>
    </View>
    </View>
  )
}
