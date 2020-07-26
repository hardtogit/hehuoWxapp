import Taro from "@tarojs/taro";
import {downUrl} from '@/config'
import { View, Image,Text } from "@tarojs/components";
import "./index.scss";

export default function Index(props) {
  const {room,shop_id}=props
  return (
    <View className="room" onClick={()=>{Taro.navigateTo({url:`/pages/home/roomDetail/index?id=${room._id}&shop_id=${shop_id}`})}}>
      <View className="left">
        <Image
          className="cover"
          src={downUrl+room.shop_fids[0]}
        ></Image>
      </View>
      <View className="center">
  <View className="name">{room.room_name}</View>
        <View className="stars">
          <Image className='icon' src={require('../../assets/img/home/star.png')}></Image>
          <Image className='icon' src={require('../../assets/img/home/star.png')}></Image>
          <Image className='icon' src={require('../../assets/img/home/star.png')}></Image>
          <Image className='icon' src={require('../../assets/img/home/star.png')}></Image>
          <Image className='icon' src={require('../../assets/img/home/star.png')}></Image>
        </View>
  <View className="sale">{room.sold_cnt}已售</View>
  <View className="dis">{room.room_size}平  推荐{room.number}人</View>
      </View>
      <View className="right">
        <View className="price">
          {room.price.type==='一口价'&&
           <View className="num">{room.price.money}{room.price.type=='时段价'&&<Text className='text'>起</Text>}</View>
          }
          {
            room.price.type==='时段价'&&
            <View className="num">{room.price.money*2}{room.price.type=='时段价'&&<Text className='text'>起</Text>}</View>
          }
        </View>
        <View className="btn">我要预约</View>
      </View>
    </View>
  );
}
