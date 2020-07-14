import Taro, { Component ,useEffect} from "@tarojs/taro";
import { View, Button, Text, WebView, Image} from "@tarojs/components";
import network from '../../utils/network'
import "./index.scss";


const Index = () => {
  return (
    <View className='modal'>
       <View className='mask'>
       </View>
        <View className='content'>
          <View className='inner'>
            <View className='top'>

            </View>

          </View>
        </View>
    </View>
  )
}
Index.config = {
  navigationBarTitleText: '登陆'
}


