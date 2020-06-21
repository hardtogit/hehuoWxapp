import Taro, { Component ,useState,useEffect} from "@tarojs/taro";
import { View, Button, Text, Map, Input, Image, CoverView } from "@tarojs/components";
import "./index.scss";


const Index = () => {
  const [location,setLocation]=useState({})
  const userInfo=Taro.getStorageSync('userInfo')
  console.log(userInfo)
  const chooseLocation = () => {
    Taro.chooseLocation({
      success: (e) => {
        console.log(e)
        setLocation(e)
      }
    })
  } 
  useEffect(()=>{
     Taro.getLocation({
       success:(e)=>{
        console.log(e)
        setLocation(e)
       }
     }) 
  },[])
  return (
    <View className='mapPage'>
      <View className='topBar'>
        <Input className='input' onClick={chooseLocation} placeholder='搜索位置查找附近空间' />
        <Image className='img' src={userInfo.avatar_fid} />
      </View>
      <View className='mapContainer'>
        <Map className='map' latitude={location.latitude}
          longitude={location.longitude}>

          <CoverView className='btn'>
            预约空间
        </CoverView>
        </Map>
      </View>

    </View>
  )
}
Index.config = {
  navigationBarTitleText: '地图找店'
}


