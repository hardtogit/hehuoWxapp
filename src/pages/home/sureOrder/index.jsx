import Taro, { Component,useState ,useRouter,useEffect,useDidShow} from "@tarojs/taro";
import classNames from 'classnames'
import dayjs from 'dayjs'
import { View, Button, Text,Image } from "@tarojs/components";
import ChoicePayType from '@/components/ChoicePayType'
import network from '@/utils/network'
import {downUrl} from '../../../config/index'

import "./index.scss";


export default function Index(){
  const [checked,setChecked]=useState(true)
  const [visible,setVisible]=useState(false)
  const router=useRouter()
  const [room,setRoom] =useState({})
  const [discount,setDiscount] =useState()
  const sureOrderData=Taro.getStorageSync('sureOrderData')
  // console.log(sureOrderData,'asdasd')
  let money=0;
  if(router.params.type==2){
    money=sureOrderData.price
  }else{
    money=room.room&&room.room.price.money
  }
  useDidShow(()=>{
    const selectDiscount=Taro.getStorageSync('discount')
    setDiscount(selectDiscount)
    Taro.removeStorageSync('discount')
  })
  useEffect(()=>{
    network.Fetch({
      "obj":"user",
      "act":"single_room",
      "room_id": router.params.id||'o15942139490885128974'
    }).then(data=>setRoom(data))
  },[])
  const buy=(payment_type)=>{
    Taro.showLoading({
      title:'处理中，请稍后...',
      mask:true
    })
    network.Fetch({
      "obj":"user",
      "act":"generate_order",
      "room_id":router.params.id||'o15942139490885128974',
      "service_time":{
        "begin_time":router.params.type==2?sureOrderData.timeScope.startTime:'',
        "end_time":router.params.type==2?sureOrderData.timeScope.endTime:''
      },
      // "discount":{
      //   "type":1,
      //   "discount_id":''
      // },
      "payment_amount":money,
      "payment_type":payment_type
    }).then((res)=>{
      Taro.hideLoading({})
      setVisible(false)
      Taro.requestPayment({
        ...res.pay_info,
        success:()=>{
            Taro.showToast({
              title:'下单成功',
              icon:'none'
            })
            setTimeout(()=>{
               Taro.switchTab({url:'/pages/home/index'})
            },500)
        }
      })
      // console.log(data)
        // Taro.navigateTo({url:'/pages/home/success/index'})
    })

  }
  const createOrder=()=>{
        if(!checked){
          Taro.showToast({
            title:'请先阅读并同意协议',
            icon:'none'
          })
          return
        }
        setVisible(true)
  }
 const  goOne=()=>{
   let total=0
  if(router.params.type==2){
    total=sureOrderData.price
  }else{
    total=room.room&&room.room.price.money
  }
      if(discount&&discount.type=='优惠券'){
        Taro.navigateTo({url:`/pages/home/selectCoupon/index?id=${room.room.shop_id}&couponId=${discount.coupon._id}&type=1&price=${total}`})
      }else{
        Taro.navigateTo({url:`/pages/home/selectCoupon/index?id=${room.room.shop_id}&price=${total}`})
      }

  }
  return(
    <View className='sureOrder'>
         {visible&&<ChoicePayType onOk={buy} price={money} onCancel={()=>{setVisible(false)}}></ChoicePayType>}

      <View className='card'>
        <View className='top'>
          <Image className='img' src={downUrl+room.room.shop_fids[0]}></Image>
       <View className='name'>{room.room.room_name}</View>
        </View>
        <View className='item'>
          <View className='left'>服务时间：</View>
          <View className='right'>{router.params.type==2?`${dayjs(sureOrderData.timeScope.startTime*1000).format('MM月DD日 HH:mm')} - ${dayjs(sureOrderData.timeScope.endTime*1000).format('MM月DD日 HH:mm')}`:'商家一口价时段'}</View>
        </View>
        <View className='item'>
          <View className='left'>服务时长：</View>
          <View className='right'>{router.params.type==2?`${parseInt((sureOrderData.timeScope.endTime-sureOrderData.timeScope.startTime)/3600)}小时${(sureOrderData.timeScope.endTime-sureOrderData.timeScope.startTime)%3600!=0?((sureOrderData.timeScope.endTime-sureOrderData.timeScope.startTime)%3600)/60+'分钟':''}`:'商家一口价时长'} </View>
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
          <View className='right'>{money}</View>
        </View>
    </View>
    <View className='card two'>
              <View className='cell' onClick={goOne}>
                    <View className='left'>
                        优惠券
                    </View>
                    <View className='right'>
                        <Image className='icon' src={require('../../../assets/img/me/arrow_right.png')}></Image>
                    </View>
                </View>
                {router.params.type==2&&
                  <View className='cell' onClick={()=>Taro.navigateTo({url:`/pages/home/selectTimeCard/index?id=${room.room.shop_id}`})}>
                    <View className='left'>
                        次卡选择
                    </View>
                    <View className='right'>
                        <Image className='icon' src={require('../../../assets/img/me/arrow_right.png')}></Image>
                    </View>
                </View>
                }

    </View>
    <View className='three card'>
      <View className='title'>温馨提示</View>
      <View className='text'>1.如空间无占用情况，可提前15分钟扫描进入</View>
      <View className='text'>2.空间设有自动售货机，如有需要可自行扫描购买</View>
      <View className='text'>3.请把握好使用时间，空间将在时间结束后断开电源</View>
      <View className='text'>4.空间一旦预订成功后不支持退单</View>
    </View>
    <View className='card two'>
              <View className='cell' >
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
      <View className='num'>{money}</View>
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


