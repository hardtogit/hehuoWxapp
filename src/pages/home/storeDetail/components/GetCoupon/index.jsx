import Taro, { Component,useEffect,useState,useRouter} from "@tarojs/taro";
import classNames from 'classnames'
import network from '@/utils/network'
import dayjs from 'dayjs'
import {AtFloatLayout} from 'taro-ui'
import { View, Button, Text,Image } from "@tarojs/components";
import "./index.scss";



export default (props) => {
  const {shop_id,visible,onCancel}=props
  const [coupons,setCoupons]=useState([])
  const [empty,setEmpty]=useState(false)
  const [getCoupons,setGetCoupons]=useState([])

  const getCouponFn=(disc_id)=>{
    network.Fetch({
      "obj":"user",
      "act":"add_discounts",
      "disc_id":disc_id,
      "shop_id":shop_id,
    }).then(()=>{
      Taro.showToast({
        title:'领取成功',
        icon:'none'
      })
      network.Fetch({
        "obj":"user",
        "act":"list_shop_discounts",
        "shop_id":shop_id,
        "user_disc_stat":"未领取",
        "page":1,
        "limit":100
      }).then((data)=>{
        setCoupons(data.list)
        setGetCoupons(data.ulist)
        if((!data.list||data.list.length===0)&&(!data.ulist||data.ulist.length===0)){
          setEmpty(true)
        }
      })
    })
  }
  useEffect(()=>{
    network.Fetch({
      "obj":"user",
      "act":"list_shop_discounts",
      "shop_id":shop_id,
      "user_disc_stat":"未领取",
      "page":1,
      "limit":100
    }).then((data)=>{
      setCoupons(data.list)
      setGetCoupons(data.ulist)
      if((!data.list||data.list.length===0)&&(!data.ulist||data.ulist.length===0)){
        setEmpty(true)
      }
    })
  },[])
  return (
    <AtFloatLayout isOpened={visible} >
      <View className='modal'>
       <View className='header'>
         <View className='left'>优惠券</View>
          <View className='right' onClick={onCancel}>X</View>
       </View>
            {
        empty&&
        <View className='empty'>
        <Image  className='emptyImg' src={require('../../../../../assets/img/no_data.png')}></Image>
        <View className='emptyText'>
          暂无优惠活动
        </View>
      </View>
      }
      {coupons.map((coupon)=>{
        return(
          <View className={classNames(['coupon'])}>
          <View className='left'>
            <View className='num'>
              <View className='unit'>¥</View> {coupon.disc_off_price}
            </View>
            <View className='text'>
              {coupon.disc_use_price!=0?`满${coupon.disc_use_price}可用`:'无门槛'}
            </View>
          </View>
          <View className='center'>
        <View className='title'> {coupon.disc_name}</View>
        <View className='time'> 有效期：{dayjs(coupon.effective_time*1000).format('YYYY.MM.DD')}-{dayjs(coupon.expire_time*1000).format('YYYY.MM.DD')}</View>
          </View>
          <View className='right'>
            <View className='btn' onClick={()=>getCouponFn(coupon._id)}>领取</View>
          </View>
        </View>
        )
      })}
       {getCoupons.map((coupon)=>{
        return(
          <View className={classNames(['coupon'])}>
          <View className='left'>
            <View className='num'>
              <View className='unit'>¥</View> {coupon.disc_off_price}
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
            <View className='btn default'>已领取</View>
          </View>
        </View>
        )
      })}
      <View className='btns' onClick={onCancel}>
         确认
      </View>
      </View>
    </AtFloatLayout>
  )
}


