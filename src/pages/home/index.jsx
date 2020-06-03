import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text ,Image,Swiper,SwiperItem} from "@tarojs/components";
import TeaCard from '../../components/TeaCard'
import  "./index.scss";

export default  function Index(){
  return(
    <View>
    <View className='header'>
    <View className='toolbar'>
      <View className='left'>
        <Image className='location' src={require('../../assets/img/home/location_one.png')}></Image>
         <Text className='text'>上海市晋安区</Text>
         <Image className='arrow_down'  src={require('../../assets/img/home/arrow_down.png')}></Image>
      </View>
      <View className='right'>
        <View className='cooperation'>
          <Image className='icon' src={require('../../assets/img/home/cooperation.png')}></Image>
          <Text className='label'>加盟合作</Text>
        </View>

        <View className='store'>
        <Image className='icon' src={require('../../assets/img/home/store.png')}></Image>
          <Text className='label'>积分商城</Text>
        </View>
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
        <SwiperItem>
          <Image className='slide' src={require('../../assets/img/home/fn_one.png')}></Image>
        </SwiperItem>
        <SwiperItem>
        <Image className='slide' src={require('../../assets/img/home/fn_one.png')}></Image>
        </SwiperItem>
        <SwiperItem>
        <Image className='slide' src={require('../../assets/img/home/fn_one.png')}></Image>
        </SwiperItem>
      </Swiper>
    </View>
    <View className='functions'>
      <View className='function'>
      <Image className='icon' src={require('../../assets/img/home/fn_one.png')}></Image>
       <Text className='text'>
         我来续单
       </Text>
      </View>
      <View className='function'>
      <Image className='icon' src={require('../../assets/img/home/fn_two.png')}></Image>
       <Text className='text'>
         开门码
       </Text>
      </View>
      <View className='function'>
      <Image className='icon' src={require('../../assets/img/home/fn_three.png')}></Image>
       <Text className='text'>
         有事找我
       </Text>
      </View>
      <View className='function'>
      <Image className='icon' src={require('../../assets/img/home/fn_four.png')}></Image>
       <Text className='text'>
         地图找店
       </Text>
      </View>
    </View>
    </View>
    <View className='body'>
      <View className='tabs'>
        <View className='tab active'>
          附近茶室
        </View>
        <View className='tab'>
          优选XX
        </View>
        <View className='tab'>
          优选XX
        </View>
      </View>
      <View className='store'>
      <TeaCard></TeaCard>
      </View>
      <View className='store'>
      <TeaCard></TeaCard>
      </View>
      <View className='store'>
      <TeaCard></TeaCard>
      </View>

    </View>
    </View>
  )
}
Index.config = {
  navigationBarTitleText: '首页',
  navigationBarBackgroundColor:'#00A0E9',
  navigationBarTextStyle:'white'
}


