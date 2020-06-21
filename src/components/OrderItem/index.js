import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import "./index.scss";

export default function Index() {
  const status = 1
  return (
    <View className='order_item'>
      <View className='top at-row'>
        <View className='at-col at-col-8 left'>订单编号:152665482265055</View>
        <View className='at-col right'>已使用</View>
      </View>
      <View className='body'>
        <View className='left'>
          <Image
            className='cover'
            src={require("../../assets/img/home/store.png")}
          ></Image>
        </View>
        <View className='right'>
          <View className='name'>测试茶室|大王峰</View>
          <View className='text'>测试茶室|大王峰</View>
          <View className='text'>测试茶室|大王峰</View>
        </View>
      </View>
      <View className='bottom'>
        <View className='left'>
          <View className='label'>
            合计：
          </View>
          <View className='unit'>¥</View>
          <View className='num'>826.00</View>
        </View>
        <View className='right'>
          {status == 0 && <View className='btn'>去支付</View>}
          {status == 1 && <View className='btn' onClick={() => Taro.navigateTo({ url: '/pages/home/openCode/index' })}>查看开门码</View>}
          {status == 2 && <View className='btn'>续费</View>}
          {status == 3 && <View className='btn'>删除订单</View>}
        </View>
      </View>
    </View>
  );
}
