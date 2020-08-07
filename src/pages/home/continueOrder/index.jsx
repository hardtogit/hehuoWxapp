import Taro, {Component, useRouter, useEffect, useState, useDidShow, useShareAppMessage} from "@tarojs/taro";
import network from '@/utils/network'
import { AtIcon } from 'taro-ui'
import dayjs from 'dayjs'
import {countDistance} from '@/utils'
import ChoicePayType from '@/components/ChoicePayType'
import {downUrl} from '@/config'
import {
  View,
  Button,
  Text,
  Image,
  Swiper,
  RichText,
  SwiperItem
} from "@tarojs/components";
import GetCoupon from "../storeDetail/components/GetCoupon";
import GetCard from "../storeDetail/components/GetCard";
import TimePicker from "../../../components/TimePicker";
import "./index.scss";
import QQMapWX from "../../../assets/js/qqmap-wx-jssdk.min";

const  qqmapsdk = new QQMapWX({
  key: 'CS7BZ-V2ZWQ-Q7455-G3YYK-5VSCZ-T4BQU'
});
export default function Index() {
  const router=useRouter()
  const [room, setRoom] = useState({})
  const [entity, setEntity] = useState({})
  const [visibleOne,setVisibleOne]=useState(false)
  const [visibleTwo,setVisibletwo]=useState(false)
  const [timeScope,setTimeScope] = useState()
  const [visibleThree,setVisibleThree]=useState(false)
  const [timeCard,setTimeCard]=useState({})
  const buttonPosition=Taro.getMenuButtonBoundingClientRect()
  useDidShow(()=>{
    const appointmentTimeScope=Taro.getStorageSync('appointmentTimeScope')
    setTimeScope(appointmentTimeScope)
    Taro.removeStorageSync('appointmentTimeScope')
  })
  const openLocation=()=>{
    console.log(entity.shop)
      Taro.openLocation({
        longitude: Number(entity.shop.longitude),
        latitude: Number(entity.shop.latitude),
        name: entity.shop.shop_name,
        address: entity.shop.address
      })
  }
  useShareAppMessage((options)=>{
    return {
      title:room.room.room_name,
      path:'/pages/home/roomDetail/index?id='+router.params.id+'&shop_id='+router.params.shop_id,
    }
  })
  useEffect(() => {
    if(Taro.getStorageSync('myLocation')){
      network.Fetch({
        "obj":"user",
        "act":"details_shops",
        "shop_id":router.params.shop_id||'o15956078815923459529',
        "latitude":Taro.getStorageSync('myLocation').lat,
        "longitude":Taro.getStorageSync('myLocation').lng,
      }).then((res)=>{
        Taro.setNavigationBarTitle({
          title:res.shop.shop_name
        })
        setEntity(res)
      })
    }else{
      qqmapsdk.reverseGeocoder({
        success:function(results){
          network.Fetch({
            "obj":"user",
            "act":"details_shops",
            "shop_id":router.params.shop_id||'o15956078815923459529',
            "latitude":results.result.location.lat,
            "longitude":results.result.location.lng,
          }).then((res)=>{
            Taro.setNavigationBarTitle({
              title:res.shop.shop_name
            })
            setEntity(res)
          })
          Taro.setStorageSync('myLocation',results.result.location)
        }
      })
    }

    network.Fetch({
      "obj":"user",
      "act":"single_room",
      "room_id": router.params.id||'o15942139490885128974'
    }).then(data=>setRoom(data))
  }, [router.params.id, router.params.shop_id])
  const goCount=()=>{
    //TODO验证

   console.log(timeScope)

    return
    Taro.setStorageSync('orderInfo',)
     Taro.navigateTo({url:'/pages/home/sureOrder/index'})
  }
  const buy=(payment_type)=>{
    network.Fetch({
    "obj":"user",
		"act":"add_card_user",
		"memb_id":timeCard._id,
    "shop_id":router.params.shop_id||'o15956078815923459529',
     payment_type
    }).then((data)=>{
      setVisibleThree(false)
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
  const openPay=(selectTimeCard)=>{
    setTimeCard(selectTimeCard)
    setVisibleThree(true)
  }
  console.log(timeScope)
  // `预约时间：${dayjs(timeScope.startTime*1000).format('MM月DD日 HH:ss')} - ${dayjs(timeScope.endTime*1000).format('MM月DD日 HH:ss')}`
  return (
    <View className='store_detail'>

       {visibleThree&&<ChoicePayType onOk={buy} price={timeCard.memb_price} onCancel={()=>{setVisibleThree(false)}}></ChoicePayType>}
      {visibleOne&&<View className='getCoupon'> <GetCoupon visible shop_id={router.params.shop_id||'o15937049856544559001'} onCancel={()=>setVisibleOne(false)} /></View>}
      {visibleTwo&& <View className='getCard'><GetCard openPay={openPay} timeCards={entity.memb_card} shop_id={router.params.shop_id||'o15937049856544559001'}  visible onCancel={()=>setVisibletwo(false)}></GetCard></View> }
      <View className='navBar' style={{top:`${buttonPosition.top}px`,height:`${buttonPosition.height}px`,paddingRight:`${buttonPosition.width+20}px`}}>
        <AtIcon value='chevron-left' color='#fff' size={28} onClick={()=>Taro.navigateBack({})}></AtIcon>
        <View className='right'>
          <Button  style={{width:`${buttonPosition.height}px`,height:`${buttonPosition.height}px`}} openType='share' className='shareBtn'> <Image className='icon' src={require('../../../assets/img/home/share.png')}></Image></Button>
        </View>

      </View>
      <View className='swiper_container'>
        <Swiper
          className='swiper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay
        >
          {room.room.shop_fids.map((url)=>{
            return(
              <SwiperItem>
              <Image
                className='slide'
                src={downUrl+url}
              ></Image>
            </SwiperItem>
            )
          })}
        </Swiper>
      </View>
      <View className='content'>
        <View className='title'>{room.room.room_name}</View>
         <View className='tips'>
           <View className='tip'>
             <Image className='icon' src={require('../../../assets/img/me/room_one.png')}></Image>
             <View className='text'>以预约时间为准</View>
           </View>
           <View className='tip'>
             <Image className='icon' src={require('../../../assets/img/me/room_two.png')}></Image>
        <View className='text'>{room.room.room_size}平米</View>
           </View>
           <View className='tip'>
             <Image className='icon' src={require('../../../assets/img/me/room_three.png')}></Image>
             <View className='text'>{room.room.number}人</View>
           </View>
         </View>
        <View className='address' onClick={()=>openLocation()}>
          <View className='text'>
          <View>{entity.shop.address}</View>
  <View>距离您有{countDistance(entity.shop.distance)}</View>
          </View>
          <View className='icon'>
            <Image className='img' src={require('../../../assets/img/me/room_ad.png')}></Image>
          </View>
          <Image className='arrow'  src={require('../../../assets/img/me/arrow_right.png')}></Image>
        </View>
        <View className='labels'>
          {entity.shop.features_serve.map((text)=>{
              return (
              <View className='label'>{text}</View>
              )
          })}
        </View>
        {room.room.price.type==='时段价'&&
        <View className='bar three' onClick={()=>Taro.navigateTo({url:`/pages/home/appointment/index?shop_id=${room.room.shop_id||'o15937049856544559001'}&tea_zone_id=${room.room._id||'o15937054688063290119'}`})}>
        <View className='text'>
          {timeScope?`预约时间：${dayjs(timeScope.startTime*1000).format('MM月DD日 HH:mm')} - ${dayjs(timeScope.endTime*1000).format('MM月DD日 HH:mm')}`:'点击选择时间'}
        </View>
        <Image className='arrow' src={require('../../../assets/img/me/arrow_right_w.png')}></Image>
        </View>
        }
        {/* <View className='bar one' onClick={()=>Taro.navigateTo({url:`/pages/home/buyCoupon/index?id=${room.room.shop_id||'o15937049856544559001'}`})}> */}
        <View className='bar one' onClick={()=>setVisibleOne(true)}>
          <Image className='left' src={require('../../../assets/img/home/item_one.png')}></Image>
          <View className='center'>限时优惠折扣</View>
          <View className='text'>我要领取</View>
          <Image className='arrow' src={require('../../../assets/img/home/right_one.png')}></Image>
        </View>
        {/* <View className='bar two' onClick={()=>{Taro.setStorageSync('timeCards',room.memb_card); Taro.navigateTo({url:`/pages/home/buyTimesCard/index?shop_id=${router.params.id||'o15937049856544559001'}`})}}> */}
        <View className='bar two' onClick={()=>setVisibletwo(true)}>
          <Image className='left' src={require('../../../assets/img/home/item_two.png')}></Image>
          <View className='center'>次卡优惠购买</View>
          <View className='text'>够买优惠次数</View>
          <Image className='arrow' src={require('../../../assets/img/home/right_two.png')}></Image>
        </View>

      <View className='discription'>
          <View className='sub_title'>
              使用说明：
          </View>
          <RichText nodes={room.room.details_desc} >

          </RichText>
        </View>
        </View>
        <View className='bottom'>
          <View className='service'>
            <Image className='icon' src={require('../../../assets/img/me/room_five.png')}>
            </Image>
            <View className='text'>
              电话
            </View>
          </View>
          <View className='price'>
            <View className='unit'>¥</View>
        {room.room.price.type==='时段价'?<View className='num'>{timeScope?room.room.price.money*2*(timeScope.endTime-timeScope.startTime)/3600:room.room.price.money*2}</View>:<View className='num'>{room.room.price.money}</View>}
        {room.room.price.type==='时段价'&&<View className='text'>{timeScope?`${parseInt((timeScope.endTime-timeScope.startTime)/3600)}小时${(timeScope.endTime-timeScope.startTime)%3600!=0?((timeScope.endTime-timeScope.startTime)%3600)/60+'分钟':''}`:'起'}</View>}
          </View>
          <View className='btn' onClick={goCount}>
             {/* {timeScope.length!==0?<View onClick={()=>Taro.navigateTo({url:`/pages/home/sureOrder/index?id=${room.room._id}&type=1`})}>去结算</View>:<View onClick={()=>Taro.navigateTo({url:`/pages/home/appointment/index?shop_id=${room.room.shop_id||'o15937049856544559001'}&tea_zone_id=${router.params.id||'o15937054688063290119'}`})}>去预约</View>} */}
             {room.room.price.type==='时段价'?
timeScope?<View onClick={()=>{Taro.setStorageSync('sureOrderData',{
   timeScope,
   price:room.room.price.money*(timeScope.endTime-timeScope.startTime)/3600*2
});
  Taro.navigateTo({url:`/pages/home/sureOrder/index?id=${room.room._id}&type=2&way=xy`})}}
>去结算</View>:<View onClick={()=>Taro.navigateTo({url:`/pages/home/continueAppointment/index?shop_id=${room.room.shop_id||'o15937049856544559001'}&tea_zone_id=${room.room._id||'o15937054688063290119'}`})}>去续约</View>:
<View onClick={()=>Taro.navigateTo({url:`/pages/home/sureOrder/index?id=${room.room._id}&type=1`})}>去结算</View>
}
          </View>
        </View>
    </View>
  );
}
Index.config={
  navigationStyle:'custom',
  navigationBarTitleText: '店铺',
}
