import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import "./index.scss";

export default function Index() {
  return (
    <View className="room">
      <View className="left">
        <Image
          className="cover"
          src={require("../../assets/img/home/fn_one.png")}
        ></Image>
      </View>
      <View className="center">
        <View className="name">房间</View>
        <View className="stars"></View>
        <View className="sale">128已售</View>
        <View className="dis">25平 35人推荐</View>
      </View>
      <View className="right">
        <View className="price">
          <View className="num">58</View>
        </View>
        <View className="btn">我要预约</View>
      </View>
    </View>
  );
}
