import Taro, { Component ,useEffect,useState} from "@tarojs/taro";
import classNames from 'classnames'
import { View, Button, Text, WebView, Image} from "@tarojs/components";
import network from '../../utils/network'
import "./index.scss";


const Index = (props) => {
  const [visible,setVisible]=useState(false)
  const {problem}=props
  return (
    <View className='card'>
        <View className='top'>
          <View className='inner'>
            <View className='left'>
                  <View className='title'>2小时/次</View>
                  <View className='time'>活动有效期：2019.11.21-2019.12.11</View>
            </View>
            <View className='btn'>
              去使用
            </View>
          </View>
          <View className='name'>
          限测试茶室合作店使用
          </View>
        </View>

    </View>
  )
}

