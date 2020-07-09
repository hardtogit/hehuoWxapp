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
import TimePicker from "../../../components/TimePicker";
import "./index.scss";

export default function Index() {
  const router=useRouter()
  const [room, setRoom] = useState({})
  const [timeScope,setTimeScope] = useState([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    network.Fetch({
      "obj":"user",
      "act":"single_room",
      "room_id": router.params.id||'o15937054688063290119'
    }).then(data=>setRoom(data))
  }, [])
  const goCount=()=>{
    //TODO验证
     Taro.navigateTo({url:'/pages/home/sureOrder/index'})
  }
  return (
    <View className='store_detail'>
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
        <View className='bar three' onClick={()=>setVisible(true)}>
          <View className='text'>
                点击选择时间
          </View>
          <Image className='arrow' src={require('../../../assets/img/me/arrow_right_w.png')}></Image>
        </View>
        <View className='bar one'>
          <Image className='left' src={require('../../../assets/img/home/item_one.png')}></Image>
          <View className='center'></View>
          <View className='text'>选择优惠券</View>
          <Image className='arrow' src={require('../../../assets/img/home/right_one.png')}></Image>
        </View>
        <View className='bar two'>
        <Image className='left' src={require('../../../assets/img/home/item_two.png')}></Image>
          <View className='center'></View>
          <View className='text'>选择次卡</View>
          <Image className='arrow' src={require('../../../assets/img/home/right_two.png')}></Image>
        </View>
      </View>

      <View className='discription'>
          <View className='sub_title'>
              使用说明：
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
        <View className='num'>{room.room.price.money}</View>
            <View className='text'>起</View>
          </View>
          <View className='btn' onClick={goCount}>
            去结算
          </View>
        </View>
        <TimePicker visible={visible} onOk={(timeScope)=>setTimeScope(timeScope)} onCancel={()=>setVisible(false)}></TimePicker>
    </View>
  );
}
