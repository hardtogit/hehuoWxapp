import Taro, { Component, useRouter ,useEffect,useState} from "@tarojs/taro";
import network from '@/utils/network'
import {downUrl} from '@/config'
import {
  View,
  Button,
  Text,
  Image,
  Swiper,
  SwiperItem
} from "@tarojs/components";
import RoomItem from "../../../components/RoomItem";
// import RoomItem from "../../../components/CouponSelectItem";
import GetCoupon from "./components/GetCoupon";


import "./index.scss";

export default function Index() {
  const router=useRouter()
  const [entity,setEntity]=useState()
  const [visibleOne,setVisibleOne]=useState(false)

  const openLocation=()=>{
    console.log(entity.shop)
      Taro.openLocation({
        longitude: Number(entity.shop.longitude),
        latitude: Number(entity.shop.latitude),
        name: entity.shop.shop_name,
        address: entity.shop.address
      })
  }
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
    })
  }
  useEffect(() => {
    network.Fetch({
      "obj":"user",
	"act":"details_shops",
	"shop_id":router.params.id||'o15937049856544559001',
    }).then((res)=>{
      setEntity(res)
    })
  }, [router.params.id])
  return (
    <View className='store_detail'>
       <GetCoupon visible={visibleOne} coupons={entity.disc} onCancel={()=>setVisibleOne(false)} getCouponFn={getCouponFn}></GetCoupon>
      <View className='swiper_container'>
        <Swiper
          className='swiper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay
        >
          {entity.shop.shop_fids.map((url)=>(<SwiperItem>
            <Image
              className='slide'
              src={downUrl+url}
            ></Image>
          </SwiperItem>))}
        </Swiper>
      </View>
      <View className='content'>
  <View className='title'>{ entity.shop.label}|{entity.shop.shop_name}</View>
        <View className='address' onClick={()=>Taro.openLocation({})}>
          <View className='text'>
  <View>{entity.shop.address}</View>
  <View>距离您有{entity.shop.distance}km</View>
          </View>
          <View className='icon' onClick={openLocation}>
            <Image className='img' src={require('../../../assets/img/home/location_icon.png')}></Image>
          </View>
        </View>
        <View className='labels'>
          <View className='label'>投影仪</View>
          <View className='label'>充电宝</View>
        </View>

        <View className='bar one' onClick={()=>setVisibleOne(true)}>
          <Image className='left' src={require('../../../assets/img/home/item_one.png')}></Image>
          <View className='center'>限时优惠折扣</View>
          <View className='text'>我要领取</View>
          <Image className='arrow' src={require('../../../assets/img/home/right_one.png')}></Image>
        </View>
        <View className='bar two' onClick={()=>{Taro.setStorageSync('timeCards',entity.memb_card); Taro.navigateTo({url:`/pages/home/buyTimesCard/index?shop_id=${router.params.id||'o15937049856544559001'}`})}}>
        <Image className='left' src={require('../../../assets/img/home/item_two.png')}></Image>
          <View className='center'>次卡优惠购买</View>
          <View className='text'>够买优惠次数</View>
          <Image className='arrow' src={require('../../../assets/img/home/right_two.png')}></Image>
        </View>
        <View className='rooms'>
          <View className='item_title'>
            所有空间
          </View>
          {entity.room.map((room)=>{
            return(
              <RoomItem room={room} />
            )
          })}
        </View>
      </View>

      <View className='discription'>
          <View className='sub_title'>
              使用说明：
          </View>

        </View>

        <View className='bottom'>
              <View className='fn' onClick={()=>Taro.switchTab({url:'/pages/home/index'})}>
                <Image className='img' src={require('../../../assets/img/home/sd1.png')}></Image>
                <View className='text'>
                  首页
                </View>
              </View>
              <View className='fn'>
              <Button openType='share' className='shareBtn'>
                <Image className='img' src={require('../../../assets/img/home/sd2.png')}></Image>
                <View className='text'>
                  分享
                </View>
                </Button>
              </View>
              <View className='fn'>
                <Image className='img' src={require('../../../assets/img/home/sd3.png')}></Image>
                <View className='text'>
                  收藏
                </View>
              </View>
              <View className='fn'>
                <Image  className='img' src={require('../../../assets/img/home/sd4.png')}></Image>
                <View className='text'>
                  客服
                </View>
              </View>
        </View>
    </View>
  );
}
