import Taro, { Component,useState ,useRouter,useEffect,useDidShow} from "@tarojs/taro";
import classNames from 'classnames'
import dayjs from 'dayjs'
import { View, Button, Text,Image ,Icon} from "@tarojs/components";
import ChoicePayType from '@/components/ChoicePayType'
import network from '@/utils/network'
import {downUrl} from '../../../config/index'

import "./index.scss";


export default function Index(){
  const [checked,setChecked]=useState(false)
  const [visible,setVisible]=useState(false)
  const router=useRouter()
  const [room,setRoom] =useState({})
  const [discount,setDiscount] =useState()
  const sureOrderData=Taro.getStorageSync('sureOrderData')
  let money=0;
  let realMoney=0;
  if(router.params.type==2){
    money=sureOrderData.price;
    realMoney=sureOrderData.price
  }else{
    money=room.room&&room.room.price.money
    realMoney=room.room&&room.room.price.money
  }
  if(discount){
      if(discount.type=='优惠券'){
          realMoney=realMoney-discount.coupon.disc_off_price<0?0:(realMoney*100-discount.coupon.disc_off_price*100)/100
      }else{
          realMoney=(realMoney*100-discount.coupon.memb_off_time*room.room.price.money*2*100)<0?0:(realMoney*100-discount.coupon.memb_off_time*room.room.price.money*2*100)/100
      }
      // const a=(realMoney*100-discount.coupon.memb_off_time*room.room.price.money*2)/100
      // console.log(realMoney*100,discount.coupon.memb_off_time*room.room.price.money*2*100,'dasds')
  }
  realMoney=realMoney.toFixed(2)
  useDidShow(()=>{
    const selectDiscount=Taro.getStorageSync('discount')
    setDiscount(selectDiscount)
    Taro.removeStorageSync('discount')
  })
  useEffect(()=>{
    network.Fetch({
      "obj":"user",
      "act":"single_room",
      "room_id": router.params.id||'o15956083697860679626'
    }).then(data=>setRoom(data))
  },[])
  const buy=(payment_type)=>{
    Taro.showLoading({
      title:'处理中，请稍后...',
      mask:true
    })
    let params={}
    if(router.params.type==2){
       if(discount){
        params={
          "obj":"user",
          "act":"generate_order",
          order_type:router.params.way?'续单':'首次',
          "room_id":router.params.id||'o15951435145368449687',
          "service_time":{
            "begin_time":router.params.type==2?sureOrderData.timeScope.startTime:'',
            "end_time":router.params.type==2?sureOrderData.timeScope.endTime:''
          },
          original_amount:money,
          reservation_data:dayjs(dayjs(sureOrderData.timeScope.startTime*1000).format('YYYY-MM-DD')).unix(),
          "discount":{
            "type":discount.type,
            "discount_id":discount.coupon._id
          },
          "payment_amount":realMoney,
          "payment_type":payment_type
         }
       }else{
        params={
          "obj":"user",
          "act":"generate_order",
          order_type:router.params.way?'续单':'首次',
          "room_id":router.params.id||'o15951435145368449687',
          "service_time":{
            "begin_time":router.params.type==2?sureOrderData.timeScope.startTime:'',
            "end_time":router.params.type==2?sureOrderData.timeScope.endTime:''
          },
          original_amount:money,
          reservation_data:dayjs(dayjs(sureOrderData.timeScope.startTime*1000).format('YYYY-MM-DD')).unix(),
          "payment_amount":realMoney,
          "payment_type":payment_type
         }
       }
    }else{
      if(discount){
        params={
          "obj":"user",
          "act":"generate_order",
          order_type:'首次',
          "room_id":router.params.id||'o15942139490885128974',
          original_amount:money,
          "discount":{
            "type":discount.type,
            "discount_id":discount.coupon._id
          },
          "payment_amount":realMoney,
          "payment_type":payment_type,
          "reservation_data":dayjs(dayjs().format('YYYY-MM-DD')).unix()
      }
      }else{
        params={
          "obj":"user",
          "act":"generate_order",
          order_type:'首次',
          "room_id":router.params.id||'o15942139490885128974',
          original_amount:money,
          "payment_amount":realMoney,
          "payment_type":payment_type,
          "reservation_data":dayjs(dayjs().format('YYYY-MM-DD')).unix()
      }
      }
  }
  const continueOrder=Taro.getStorageSync('continueOrder')
  if(continueOrder&&continueOrder._id){
    params.order_id=continueOrder._id
  }
    network.Fetch(params).then((res)=>{
      Taro.removeStorageSync('appointmentTimeScope');
      Taro.hideLoading({})
      setVisible(false)
      if(payment_type==='balance'||realMoney==0){
        Taro.setStorageSync('currentOrder',res.order)
        Taro.redirectTo({url:`/pages/home/success/index?id=${res.order._id}`} )
      }else{
        Taro.requestPayment({
          ...res.pay_info,
          success:()=>{
              Taro.setStorageSync('currentOrder',res.order)
              Taro.redirectTo({url:`/pages/home/success/index?id=${res.order._id}`} )
          },
          fail:()=>{
             Taro.navigateBack({})
          }
        })
      }
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
   let startTime=sureOrderData?sureOrderData.timeScope.startTime:''
   let endTime=sureOrderData?sureOrderData.timeScope.endTime:''

  if(router.params.type==2){
    total=sureOrderData.price
  }else{
    total=room.room&&room.room.price.money
  }
      if(discount&&discount.type=='优惠券'){
        Taro.navigateTo({url:`/pages/home/selectCoupon/index?id=${room.room.shop_id}&couponId=${discount.coupon._id}&type=1&price=${total}&startTime=${startTime}&endTime=${endTime}`})
      }else{
        Taro.navigateTo({url:`/pages/home/selectCoupon/index?id=${room.room.shop_id}&price=${total}&type=1&startTime=${startTime}&endTime=${endTime}`})
      }

  }
  return(
    <View className='sureOrder'>
         {visible&&<ChoicePayType onOk={buy} price={realMoney} onCancel={()=>{setVisible(false)}}></ChoicePayType>}
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
          <View className='right'>{(discount&&discount.type=='优惠券')?<Text style={{color:'red'}}>{discount.coupon.disc_off_price}</Text>:'-'}</View>
        </View>
        <View className='item'>
          <View className='left'>次卡抵用：</View>
          <View className='right'>{(discount&&discount.type=='次卡')?<Text style={{color:'red'}}>{ `${discount.coupon.memb_off_time}小时/${discount.coupon.memb_off_time*room.room.price.money*2}`}</Text>:'-'}</View>
        </View>
        <View className='item'>
          <View className='left'>应付金额：</View>
          <View className='right'>{money}</View>
        </View>
        <View className='item'>
          <View className='left'>实付金额：</View>
          <View className='right'>{realMoney}</View>
        </View>
    </View>
    <View className='card two'>
              <View className='cell' onClick={goOne}>
                    <View className='left'>
                       <Image className='icona' src={require('../../../assets/img/home/coupon.png')}></Image>  优惠券选择
                    </View>
                    <View className='right'>
                        <Image className='icon' src={require('../../../assets/img/me/arrow_right.png')}></Image>
                    </View>
                </View>
                {router.params.type==2&&
                  <View className='cell' onClick={()=>Taro.navigateTo({url:`/pages/home/selectTimeCard/index?id=${room.room.shop_id}&startTime=${sureOrderData.timeScope.startTime}&endTime=${sureOrderData.timeScope.endTime}`})}>
                    <View className='left'>
                    <Image className='icona' src={require('../../../assets/img/home/card.png')}></Image>
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
                    <View className='left'  onClick={()=>setChecked(!checked)}>
                      {!checked&&<View style={{width:'22px',height:'22px'}} className={classNames(['checkbox', checked&&'active'])}></View>}
                      {checked&&<Icon className='gou' type={'success'} color="#00A0E9" size={22}></Icon>}
                    请详细阅读精归叙用户协议，同意后付款
                    </View>
                    <View className='right' onClick={()=>Taro.navigateTo({url:'/pages/home/doc/index'})}>
                        <Image className='icon' src={require('../../../assets/img/me/arrow_right.png')}></Image>
                    </View>
                </View>
              </View>
              <View className='bottom'>
          <View className='price'>
            <View className='unit'>¥</View>
      <View className='num'>{realMoney}</View>
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


