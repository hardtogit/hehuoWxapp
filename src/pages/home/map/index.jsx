import Taro, { Component ,useState,useEffect,useShareAppMessage} from "@tarojs/taro";
import { View, Button, Text, Map, Input, Image, CoverView,CoverImage } from "@tarojs/components";
import network from '@/utils/network'
import "./index.scss";


const Index = () => {
  const [location,setLocation]=useState({})
  const [markers,setMarkers]=useState([])
  const [name,setName]=useState('')
  const [scale,setScale]=useState(14)
  const [phone,setPhone]=useState('')
  const [visible,setVisible]=useState(false)


  const userInfo=Taro.getStorageSync('userInfo')
  console.log(userInfo)
  const chooseLocation = () => {
    Taro.chooseLocation({
      success: (e) => {
        console.log(e)
        setLocation(e)
        getMarks(e)
        setName(e.name)
      }
    })
  }
  const getMarks=(locations)=>{
    network.Fetch(
      {
        "obj":"user",
        "act":"find_nearby_shop",
        ...locations
      }
    ).then((data)=>{
      const cc=data.shop.map((item)=>{
          return {
              latitude:item.latitude,
              longitude:item.longitude,
              id:item._id,
              iconPath:'../../../assets/img/homeH.png',
              width:28,
              height:28,
              callout:{
                content:item.shop_name,
                display:"ALWAYS",
                textAlign:'center',
                bgColor:'#00A0E9',
                fontSize:10,
                borderRadius:4,
                padding:6,
                // anchorY:4,
                color:'#fff'
              },
          }
      })
        setMarkers(
          cc
        )
        setScale(13)
    })
  }
  const handleCalloutTapEventDetail=(id)=>{
    Taro.navigateTo({url:`/pages/home/storeDetail/index?id=${id.markerId}`})
    console.log(id)
  }
  useShareAppMessage({})
  useEffect(()=>{
    network.Fetch({
      "obj": "user",
      "act": "contact_us"
    }).then((a) => {
          setPhone(a.platform_phone)
    })
     Taro.getLocation({
       success:(e)=>{
        console.log(e)
        setLocation(e)
        getMarks(e)
        // setMarkers([{
        //    ...e,
        //    id:'234',
        //    iconPath:'../../../assets/img/homeH.png',
        //    width:28,
        //    height:28,
        //    callout:{
        //      content:'广发卡减肥噶',
        //      display:"ALWAYS",
        //      textAlign:'center',
        //      bgColor:'#00A0E9',
        //      fontSize:10,
        //      borderRadius:4,
        //      padding:2,
        //      anchorY:4,
        //      color:'#fff'
        //    },
        // }])
       }
     })
  },[])
  return (
    <View className='mapPage'>
      <View className='topBar'>
        <Input className='input' onClick={chooseLocation} placeholder='搜索位置查找附近空间' value={name} />
        <Image className='img' src={userInfo.avatar_fid} onClick={()=>Taro.switchTab({url:'/pages/me/index'})} />
      </View>
      <View className='mapContainer'>
        <Map className='map' latitude={location.latitude}
          longitude={location.longitude}
          markers={markers}
          scale={scale}
          showLocation
          optimize
          onMarkerTap={handleCalloutTapEventDetail}
        >
          <CoverImage className='kefu' onClick={()=>setVisible(true)} src={require('../../../assets/img/home/kefu.png')} />
          {/* {visible&& */}
          {/* <CoverView> */}
          {visible&&
            <CoverView className='mask' onClick={()=>setVisible(false)}></CoverView>
          }
         {visible&& <CoverView className='pop'>
          <CoverView className='title'>服务中心</CoverView>
            <CoverView className='funs'>
              <CoverView className='fun' onClick={()=>{Taro.makePhoneCall({phoneNumber:''+phone})}}>
                <CoverImage className='icon' src={require("../../../assets/img/home/help1.png")}></CoverImage>
                <CoverView className='text'>联系我们</CoverView>
              </CoverView>
              <CoverView className='fun' onClick={()=>Taro.navigateTo({url:'/pages/me/about/index'})}>
                <CoverImage className='icon two' src={require("../../../assets/img/home/help2.png")}></CoverImage>
                <CoverView className='text'>关于我们</CoverView>
              </CoverView>
              <CoverView className='fun ' onClick={()=>Taro.navigateTo({url:'/pages/me/problem/index'})}>
                <CoverImage className='icon three' src={require("../../../assets/img/home/help3.png")}></CoverImage>
                <CoverView className='text'> 常见问题</CoverView>
              </CoverView>
            </CoverView>
          </CoverView>}

          {/* </CoverView> */}
          {/* } */}
          <CoverView className='btn' onClick={()=>Taro.navigateTo({url:`/pages/home/storeList/index?longitude=${location.longitude}&latitude=${location.latitude}`})}>
            预约空间
        </CoverView>
        </Map>
      </View>

    </View>
  )
}
Index.config = {
  navigationBarTitleText: '地图找店',
  navigationBarBackgroundColor: '#00A0E9',
  navigationBarTextStyle: 'white'
}


