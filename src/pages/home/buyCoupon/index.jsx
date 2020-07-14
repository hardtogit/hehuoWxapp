import Taro, { Component,useRouter,useEffect,useState} from "@tarojs/taro";
import classNames from 'classnames'
import dayjs from 'dayjs'
import network from '@/utils/network'
import { View, Button, Text ,Image} from "@tarojs/components";
import "./index.scss";



export default function Index (){
  const router=useRouter()
  const [coupons,setCoupons]=useState([])
  const [empty,setEmpty]=useState(false)
  const [getCoupons,setGetCoupons]=useState([])

  const getCouponFn=(disc_id)=>{
    network.Fetch({
      "obj":"user",
      "act":"add_discounts",
      "disc_id":disc_id,
      "shops_id":router.params.id||'o15937049856544559001',
    }).then(()=>{
      Taro.showToast({
        title:'领取成功',
        icon:'none'
      })
      network.Fetch({
        "obj":"user",
        "act":"list_shop_discounts",
        "shops_id":router.params.id||'o15937049856544559001',
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
      "shops_id":router.params.id||'o15937049856544559001',
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
    <View>
      {
        empty&&
        <View className='empty'>
        <Image  className='emptyImg' src={require('../../../assets/img/no_data.png')}></Image>
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
              {coupon.disc_use_price?`满${coupon.disc_use_price}可用`:'无门槛'}
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
</View>
  )
}

Index.config = {
  navigationBarTitleText: '店铺优惠券',
}
