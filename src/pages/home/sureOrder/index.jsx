import Taro, { Component,useState } from "@tarojs/taro";
import classNames from 'classnames'
import dayjs from 'dayjs'
import { View, Button, Text } from "@tarojs/components";
import network from '@/utils/network'
import ColItem from '@/components/ColItem'
import "./index.scss";


export default function Index(){
  const [checked,setChecked]=useState(true)
  const createOrder=()=>{
        if(!checked){
          Taro.showToast({
            title:'请先阅读并同意协议',
            icon:'none'
          })
          return
        }
        Taro.showLoading({
          title:'处理中，请稍后...',
          mask:true
        })
        network.Fetch({
          "obj":"user",
          "act":"generate_order",
          "room_id":'o15942139490885128974',
          "service_time":{
            "begin_time":dayjs('2020-07-04 12:30:00').unix(),
            "end_time":dayjs('2020-07-04 14:30:00').unix()
          },
          // "discount":{
          //   "type":1,
          //   "discount_id":1
          // },
          "payment_amount":20,
          "payment_type":"payment"
        }).then((res)=>{
          Taro.hideLoading({})
          Taro.requestPayment({
            ...res.pay_info,
            success:()=>{
                Taro.showToast({
                  title:'充值成功',
                  icon:'none'
                })
                setTimeout(()=>{
                   Taro.navigateBack({})
                },2000)
            }
          })
          console.log(data)
            // Taro.navigateTo({url:'/pages/home/success/index'})
        })
  }
  return(
    <View className='sureOrder'>
      <View className='card'>
        <View className='top'>
          <Image className='img' src=''></Image>
          <View className='name'>擦空间</View>
        </View>
        <View className='item'>
          <View className='left'>服务时间：</View>
          <View className='right'></View>
        </View>
        <View className='item'>
          <View className='left'>服务时长：</View>
          <View className='right'>共计2小时</View>
        </View>
        <View className='item'>
          <View className='left'>优惠金额：</View>
          <View className='right'></View>
        </View>
        <View className='item'>
          <View className='left'>次卡抵用：</View>
          <View className='right'></View>
        </View>
        <View className='item'>
          <View className='left'>应付金额：</View>
          <View className='right'></View>
        </View>
    </View>
    <View className='card two'>
              <View className='cell' onClick={()=>{Taro.navigateTo({url:"/pages/me/recharge/index"})}}>
                    <View className='left'>
                        账户充值
                    </View>
                    <View className='right'>
                        <Image className='icon' src={require('../../../assets/img/me/arrow_right.png')}></Image>
                    </View>
                </View>
                <View className='cell'>
                    <View className='left'>
                        申请发票
                    </View>
                    <View className='right'>
                        <Image className='icon' src={require('../../../assets/img/me/arrow_right.png')}></Image>
                    </View>
                </View>
    </View>
    <View className='three card'>
      <View className='title'>温馨提示</View>
      <View className='text'>温馨提示</View>
      <View className='text'>温馨提示</View>
      <View className='text'>温馨提示</View>
      <View className='text'>温馨提示</View>
    </View>
    <View className='card two'>
              <View className='cell' onClick={()=>{Taro.navigateTo({url:"/pages/me/recharge/index"})}}>
                    <View className='left'>
                      <View className={classNames(['checkbox', checked&&'active'])} onClick={()=>setChecked(!checked)}></View>
                    请详细阅读精龟叙用户协议，同意后付款
                    </View>
                    <View className='right'>
                        <Image className='icon' src={require('../../../assets/img/me/arrow_right.png')}></Image>
                    </View>
                </View>
              </View>
              <View className='bottom'>
          <View className='price'>
            <View className='unit'>¥</View>
            <View className='num'>22</View>
          </View>
          <View className='btn' onClick={createOrder}>
            去支付
          </View>

        </View>
    </View>
  )
}
Index.config = {
  navigationBarTitleText: '确认订单'
}


