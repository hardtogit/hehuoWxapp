import Taro, { Component, useRouter ,useEffect,useState, useDidShow} from "@tarojs/taro";
import network from '@/utils/network'
import { AtIcon } from 'taro-ui'
import dayjs from 'dayjs'
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
import TimePicker from "../../../components/TimePicker";
import "./index.scss";

export default function Index() {
  const router=useRouter()
  const [room, setRoom] = useState({})
  const [timeScope,setTimeScope] = useState()
  const buttonPosition=Taro.getMenuButtonBoundingClientRect()
  useDidShow(()=>{
    const appointmentTimeScope=Taro.getStorageSync('appointmentTimeScope')
    setTimeScope(appointmentTimeScope)
    Taro.removeStorageSync('appointmentTimeScope')
  })
  useEffect(() => {
    network.Fetch({
      "obj":"user",
      "act":"single_room",
      "room_id": router.params.id||'o15942139490885128974'
    }).then(data=>setRoom(data))
  }, [])
  const goCount=()=>{
    //TODO验证

   console.log(timeScope)

    return
    Taro.setStorageSync('orderInfo',)
     Taro.navigateTo({url:'/pages/home/sureOrder/index'})
  }
  console.log(timeScope)
  // `预约时间：${dayjs(timeScope.startTime*1000).format('MM月DD日 HH:ss')} - ${dayjs(timeScope.endTime*1000).format('MM月DD日 HH:ss')}`
  return (
    <View className='store_detail'>
      <View className='navBar' style={{top:`${buttonPosition.top}px`,height:`${buttonPosition.height}px`}}>
      <AtIcon value='chevron-left' color='#fff' size={28} onClick={()=>Taro.navigateBack({})}></AtIcon>
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
        <View className='address' onClick={()=>Taro.openLocation({})}>
          <View className='text'>
          <View>上海市接单工业路中央第五街1楼22层22室</View>
          <View>距离您有2km</View>
          </View>
          <View className='icon'>
            <Image className='img' src={require('../../../assets/img/me/room_ad.png')}></Image>
          </View>
          <Image className='arrow'  src={require('../../../assets/img/me/arrow_right.png')}></Image>
        </View>
        {room.room.price.type==='时段价'&&
        <View className='bar three' onClick={()=>Taro.navigateTo({url:`/pages/home/appointment/index?shops_id=${room.room.shop_id||'o15937049856544559001'}&tea_zone_id=${room.room._id||'o15937054688063290119'}`})}>
        <View className='text'>
          {timeScope?`预约时间：${dayjs(timeScope.startTime*1000).format('MM月DD日 HH:mm')} - ${dayjs(timeScope.endTime*1000).format('MM月DD日 HH:mm')}`:'点击选择时间'}
        </View>
        <Image className='arrow' src={require('../../../assets/img/me/arrow_right_w.png')}></Image>
        </View>
        }
        <View className='bar one' onClick={()=>Taro.navigateTo({url:`/pages/home/buyCoupon/index?id=${router.params.id||'o15937049856544559001'}`})}>
          <Image className='left' src={require('../../../assets/img/home/item_one.png')}></Image>
          <View className='center'>限时优惠折扣</View>
          <View className='text'>我要领取</View>
          <Image className='arrow' src={require('../../../assets/img/home/right_one.png')}></Image>
        </View>

        <View className='bar two' onClick={()=>{Taro.setStorageSync('timeCards',room.memb_card); Taro.navigateTo({url:`/pages/home/buyTimesCard/index?shop_id=${router.params.id||'o15937049856544559001'}`})}}>
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
        {room.room.price.type==='时段价'?<View className='num'>{timeScope?room.room.price.money*(timeScope.endTime-timeScope.startTime)/3600:room.room.price.money}</View>:<View className='num'>{room.room.price.money}</View>}
        {room.room.price.type==='时段价'&&<View className='text'>{timeScope?`${parseInt((timeScope.endTime-timeScope.startTime)/3600)}小时${(timeScope.endTime-timeScope.startTime)%3600!=0?((timeScope.endTime-timeScope.startTime)%3600)/60+'分钟':''}`:'起'}</View>}
          </View>
          <View className='btn' onClick={goCount}>
             {/* {timeScope.length!==0?<View onClick={()=>Taro.navigateTo({url:`/pages/home/sureOrder/index?id=${room.room._id}&type=1`})}>去结算</View>:<View onClick={()=>Taro.navigateTo({url:`/pages/home/appointment/index?shops_id=${room.room.shop_id||'o15937049856544559001'}&tea_zone_id=${router.params.id||'o15937054688063290119'}`})}>去预约</View>} */}
            {room.room.price.type==='时段价'?
               timeScope?<View onClick={()=>{Taro.setStorageSync('sureOrderData',{
                  timeScope,
                  price:room.room.price.money*(timeScope.endTime-timeScope.startTime)/3600
               });
                 Taro.navigateTo({url:`/pages/home/sureOrder/index?id=${room.room._id}&type=2`})}}>去结算</View>:<View onClick={()=>Taro.navigateTo({url:`/pages/home/appointment/index?shops_id=${room.room.shop_id||'o15937049856544559001'}&tea_zone_id=${room.room._id||'o15937054688063290119'}`})}>去预约</View>:
               <View onClick={()=>Taro.navigateTo({url:`/pages/home/sureOrder/index?id=${room.room._id}&type=1`})}>去结算</View>
          }
          </View>
        </View>
        {/* <TimePicker visible={visible} onOk={(timeScope)=>setTimeScope(timeScope)} onCancel={()=>setVisible(false)}></TimePicker> */}
    </View>
  );
}
Index.config={
  navigationStyle:'custom',
  navigationBarTitleText: '店铺',
}
