import Taro, { Component, useState, useEffect, useShareAppMessage, useRef, useCallback, useDidShow } from "@tarojs/taro";
import { View, Button, Text, Map, Input, Image, CoverView, CoverImage } from "@tarojs/components";
import network from '@/utils/network'
import { downUrl } from '../../../config'
import QQMapWX from '../../../assets/js/qqmap-wx-jssdk.min.js';
import "./index.scss";


const Index = () => {
  const [location, setLocation] = useState({})
  const [markers, setMarkers] = useState([])
  const [name, setName] = useState('')
  const [scale, setScale] = useState(14)
  const [phone, setPhone] = useState('')
  const [distance, setDistance] = useState(0)
  const [visible, setVisible] = useState(false)
  const [currentCity, setCurrentCity] = useState('定位中...')
  const [banner, setBanner] = useState(true)
  const mapRef = useRef({})


  const userInfo = Taro.getStorageSync('userInfo')
  console.log(userInfo)
  const chooseLocation = () => {
    Taro.chooseLocation({
      ...location,
      success: (e) => {
        resetDate(e)
        setName(e.name)
      }
    })
  }
  const getDistance = (locations) => {
    network.Fetch(
      {
        "obj": "user",
        "act": "get_near",
        ...locations
      }
    ).then((data) => {
      setDistance(data.info.distance)
    })
  }
  const getMarks = (locations) => {
    network.Fetch(
      {
        "obj": "user",
        "act": "find_nearby_shop",
        ...locations
      }
    ).then((data) => {
      const cc = data.list.map((item) => {
        return {
          latitude: item.latitude,
          longitude: item.longitude,
          id: item._id,
          iconPath: '../../../assets/img/homeH.png',
          width: 28,
          height: 28,
          callout: {
            content: item.shop_name,
            display: "ALWAYS",
            textAlign: 'center',
            bgColor: '#00A0E9',
            fontSize: 10,
            borderRadius: 4,
            padding: 6,
            // anchorY:4,
            color: '#fff'
          },
        }
      })
      setMarkers(
        cc
      )
      setScale(13)
    })
  }
  const resetDate = useCallback((local) => {
    setLocation(local)
    getDistance(local)
    getMarks(local)
  })
  const handleCalloutTapEventDetail = (id) => {
    Taro.navigateTo({ url: `/pages/home/storeDetail/index?id=${id.markerId}` })
    console.log(id)
  }
  const handleRegionChange = (e) => {
    if (e.type === 'end'&&e.causedBy==='drag') {
      mapRef.current.getCenterLocation({
        success: (local) => {
          resetDate(local)
        }
      })
    }
  }
  useShareAppMessage({})
  const controltap = () => {
    mapRef.current.moveToLocation();
    getMarks(location)
  }
  useDidShow(() => {

    mapRef.current = Taro.createMapContext("map");
    console.log(mapRef.current)
    network.Fetch({
      "obj": "user",
      "act": "contact_us"
    }).then((a) => {
      setPhone(a.platform_phone)
    })
    console.log(Taro.getStorageSync('currentCity'))
    if (Taro.getStorageSync('currentCity')) {//以选择的城市为中心
      resetDate(Taro.getStorageSync('currentCity'))
    } else {
      const qqmapsdk = new QQMapWX({
        key: 'CS7BZ-V2ZWQ-Q7455-G3YYK-5VSCZ-T4BQU'
      });
      qqmapsdk.reverseGeocoder({
        success: function (results) {
          console.log(results)
          setCurrentCity(
            results.result.address_component.city
          )
          resetDate({
            latitude: results.result.location.lat,
            longitude: results.result.location.lng,
          })
        }
      })

    }
  })
  let distanceStr = '...'
  if (distance || distance == 0) {
    if (distance > 1000) {
      distanceStr = `${(distance / 1000).toFixed(1)}km`
    } else {
      distanceStr = `${distance}m`
    }

  }
  return (
    <View className='mapPage'>
      <View className='topBar'>
        <View className='city' onClick={() => Taro.navigateTo({ url: '/pages/home/city/index?from=map' })}>
          <Image className='location' src={require('../../../assets/img/home/map_location.png')} />
          {Taro.getStorageSync('currentCity') ? Taro.getStorageSync('currentCity').city : currentCity}</View>
        <View className='input'><Image className='search' src={require('../../../assets/img/home/map_search.png')} /><Input className='inner' onClick={chooseLocation} placeholder='搜索位置查找附近空间' value={name} /> </View>
        <Image className='img' src={require('../../../assets/img/home/map_car.png')} onClick={() => {
          // Taro.showModal({
          //   title:'温馨提示',
          //   content:'正在开发中，请耐心等待',

          // })
          Taro.navigateToMiniProgram({
            appId: "wxbe533391dbad496b",
            path: "/pages/index/index",
          })
        }}
        />
      </View>
      <View className='mapContainer'>
        <Map className='map' id='map' latitude={location.latitude}
          longitude={location.longitude}
          markers={markers}
          scale={scale}
          showLocation
          optimize
          onMarkerTap={handleCalloutTapEventDetail}
          onRegionChange={handleRegionChange}
        >
          {banner &&
            <CoverView className='banner'>
              <CoverImage className='close' onClick={(e) => { setBanner(false); e.stopPropagation() }} src={require('../../../assets/img/home/closes.png')} />
              <CoverImage className='icon' onClick={() => Taro.navigateTo({ url: '/pages/me/apply/index' })}
                // src='http://47.114.62.134/cgi-bin/download.pl?fid=f16280909775733239650001&proj=ckj2_ga'
                src={downUrl + 'f16280909775733239650001'}
              /> </CoverView>
          }
          <CoverView className='iconC kefu'>   <CoverImage className='icon' onClick={() => setVisible(true)} src={require('../../../assets/img/home/map_kefu.png')} /> </CoverView>
          <CoverView className='iconC location'>    <CoverImage className='icon' onClick={() => controltap()} src={require('../../../assets/img/home/map_local.png')} /></CoverView>


          <CoverImage className='iconC open' onClick={() => Taro.navigateTo({ url: '/pages/home/codeList/index?from=map' })} src={require('../../../assets/img/home/map_open.png')} />
          <CoverImage className='iconC cont' onClick={() => Taro.navigateTo({ url: '/pages/home/continueList/index?from=map' })} src={require('../../../assets/img/home/map_cont.png')} />
          <CoverView className='distance'>距离最近茶室{distanceStr}</CoverView>
          <CoverImage className='my' onClick={() => controltap()} src={require('../../../assets/img/home/map_my.png')} />

          <CoverImage className='iconC sell' onClick={() => Taro.navigateTo({ url: '/pages/me/coupon/index' })} src={require('../../../assets/img/home/map_sell.png')} />
          <CoverImage className='iconC person' onClick={() => Taro.navigateTo({ url: '/pages/me/mine/index' })} src={require('../../../assets/img/home/map_person.png')} />

          {visible &&
            <CoverView className='mask' onClick={() => setVisible(false)}></CoverView>
          }
          {visible && <CoverView className='pop'>
            <CoverView className='title'>服务中心</CoverView>
            <CoverView className='funs'>
              <CoverView className='fun' onClick={() => { Taro.makePhoneCall({ phoneNumber: '' + phone }) }}>
                <CoverImage className='icon' src={require("../../../assets/img/home/help1.png")}></CoverImage>
                <CoverView className='text'>联系我们</CoverView>
              </CoverView>
              <CoverView className='fun' onClick={() => Taro.navigateTo({ url: '/pages/me/about/index' })}>
                <CoverImage className='icon two' src={require("../../../assets/img/home/help2.png")}></CoverImage>
                <CoverView className='text'>关于我们</CoverView>
              </CoverView>
              <CoverView className='fun ' onClick={() => Taro.navigateTo({ url: '/pages/me/problem/index' })}>
                <CoverImage className='icon three' src={require("../../../assets/img/home/help3.png")}></CoverImage>
                <CoverView className='text'> 常见问题</CoverView>
              </CoverView>
            </CoverView>
          </CoverView>}

          {/* </CoverView> */}
          {/* } */}
          <CoverView className='btn' onClick={() => Taro.navigateTo({ url: `/pages/home/storeList/index?longitude=${location.longitude}&latitude=${location.latitude}` })}>
            预约空间
          </CoverView>
        </Map>
      </View>
    </View>
  )
}
Index.config = {
  navigationBarTitleText: '名流共享空间',
  navigationBarBackgroundColor: '#00A0E9',
  navigationBarTextStyle: 'white'
}


