import Taro, { Component ,useEffect,useState} from "@tarojs/taro";
import { View, Button, Text, WebView, Image} from "@tarojs/components";
import {downUrl} from '@/config'
import network from '@/utils/network'
import "./index.scss";

const Index = () => {
  const [entity,setEntity]=useState({})
  useEffect(()=>{
    network.Fetch({
      "obj":"user",
      "act":"about_us"
    }).then((data)=>{
      console.log(data)
      setEntity(data)
    })

  },[])
  return (
    <View className='about'>
      <Image className='logo' src={entity.logo_fid?downUrl+entity.logo_fid:''}></Image>
      <View className='title'>软件介绍：</View>
      <View className='content'>
        {entity.app_info}
      </View>
    </View>
  )
}
Index.config = {
  navigationBarTitleText: '关于我们'
}


