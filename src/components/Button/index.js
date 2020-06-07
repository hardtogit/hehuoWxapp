import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import "./index.scss";

export default function Index(props) {
  return (
    <View className='btn' onClick={()=>{props.onClick&&props.onClick()}}>
      {props.text}
   </View>
  );
}
