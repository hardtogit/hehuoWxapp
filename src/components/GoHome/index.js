import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.scss";

export default function Index() {
  return (
    <View className='btnHome' onClick={()=>{Taro.switchTab({url:'/pages/home/index'})}}>
      回到首页
   </View>
  );
}
