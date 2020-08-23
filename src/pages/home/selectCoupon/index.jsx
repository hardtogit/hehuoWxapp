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
  const [id,setId]=useState()
  const [selectCoupon,setSelectCoupon]=useState({})
  useEffect(()=>{
    console.log(router.params)
    if(router.params.type==1){//表示是优惠券
      console.log(router.params.couponId)
      setId(router.params.couponId)
      console.log(router.params.couponId)
    }
    network.Fetch({
      "obj":"user",
      "act":"list_user_discounts",
      "shop_id":router.params.id||'o15937049856544559001',
      "begin_time":router.startTime|| dayjs(dayjs().format('YYYY-MM-DD')).unix(),
      "end_time":router.endTime|| dayjs(dayjs().format('YYYY-MM-DD 23:59:59')).unix(),
      "page":1,
      "limit":20
    }).then((data)=>{
      setCoupons(data.list)
      // setGetCoupons(data.ulist)
      if(!data.list||data.list.length===0){
        setEmpty(true)
      }
    })
  },[router.endTime, router.params, router.startTime])
  const submit=()=>{
    const arr=coupons.filter((item)=>id==item._id)
    console.log(arr,'sdsds')
    Taro.setStorageSync('discount',{type:'优惠券',coupon:arr[0]})
    Taro.navigateBack({})
  }
  console.log(router.params.price)
  return (
    <View className='selectCoupon'>
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
            <View className={classNames(['btn',id==coupon._id&&'active', parseInt(router.params.price)< parseInt(coupon.disc_use_price)&&'default'])} onClick={()=>{

              // if(parseInt(router.params.price)< parseInt(coupon.disc_use_price)){
              //   return
              // }
              // setId(coupon._id)
              // const arr=coupons.filter((item)=>id==item._id)
              // console.log(arr,'sdsds')
              Taro.setStorageSync('discount',{type:'优惠券',coupon:coupon})
              Taro.navigateBack({})


            }}
            >使用</View>
          </View>
        </View>
        )
      })}
         {/* <View className='buttom'>
        <View className='right' onClick={submit}>
          确定
        </View>
      </View> */}
        <View className='tip'>*不可与次卡叠加使用</View>
</View>
  )
}

Index.config = {
  navigationBarTitleText: '店铺优惠券',
}
