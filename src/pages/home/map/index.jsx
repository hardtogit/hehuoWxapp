import Taro, { Component, useState, useEffect, useShareAppMessage, useRef, useCallback, useDidShow } from "@tarojs/taro";
import { View, Button, Text, Map, Input, Image, CoverView, CoverImage } from "@tarojs/components";
import network from '@/utils/network'
import { downUrl } from '../../../config'
import QQMapWX from '../../../assets/js/qqmap-wx-jssdk.min.js';
import "./index.scss";

const qqmapsdk = new QQMapWX({
  key: 'CS7BZ-V2ZWQ-Q7455-G3YYK-5VSCZ-T4BQU'
});
const Index = () => {
  const [location, setLocation] = useState({})
  const [markers, setMarkers] = useState([])
  const [name, setName] = useState('')
  const [scale, setScale] = useState(16)
  const [phone, setPhone] = useState('')
  const [distance, setDistance] = useState(0)
  const [visible, setVisible] = useState(false)
  const [currentCity, setCurrentCity] = useState('定位中...')
  const [banner, setBanner] = useState(true)
  const [currentLocation, setCurrentLocation] = useState('')
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
        "act": "map_shop",
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
      setScale(16)
    })
  }
  const resetDate = (local) => {
    setLocation(local)
    getDistance(local)
    getMarks(local)
  }
  const handleCalloutTapEventDetail = (id) => {
    Taro.navigateTo({ url: `/pages/home/storeDetail/index?id=${id.markerId}` })
    console.log(id)
  }
  const handleRegionChange = (e) => {
    if (e.type === 'end' && e.causedBy === 'drag') {
      mapRef.current.getCenterLocation({
        success: (local) => {
          resetDate(local)
        }
      })
    }
  }
  useShareAppMessage({})
  const controltap = () => {
    const currentScale = mapRef.current.getScale()
    setScale(currentScale)
    qqmapsdk.reverseGeocoder({
      success: function (results) {
        console.log(results)
        Taro.setStorageSync('localCity', {
          city: results.result.address_component.city, latitude: results.result.location.lat,
          longitude: results.result.location.lng
        })
        resetDate({
          city: results.result.address_component.city, latitude: results.result.location.lat,
          longitude: results.result.location.lng
        })
      }
    })

    mapRef.current.moveToLocation({
      success: () => {
        qqmapsdk.reverseGeocoder({
          success: function (results) {
            console.log(results)
            Taro.setStorageSync('localCity', {
              city: results.result.address_component.city, latitude: results.result.location.lat,
              longitude: results.result.location.lng
            })
            resetDate({
              city: results.result.address_component.city, latitude: results.result.location.lat,
              longitude: results.result.location.lng
            })
          }
        })
      }
    })


    // setTimeout(() => {
    //   setTimeout(() => {
    //     resetDate(Taro.getStorageSync('localCity'))
    //   }, 100)
    // }, 0)
  }
  useDidShow(() => {


    // if (currentLocation) {
    //   if (Taro.getStorageSync('currentCity')) {
    //     if (currentLocation !== Taro.getStorageSync('currentCity').city) {
    //       setCurrentLocation(Taro.getStorageSync('currentCity').city)
    //       resetDate(Taro.getStorageSync('currentCity'))
    //     }
    //   } else {
    //     if (currentLocation !== Taro.getStorageSync('localCity').city) {
    //       setCurrentLocation(Taro.getStorageSync('localCity').city)
    //       qqmapsdk.reverseGeocoder({
    //         success: function (results) {
    //           console.log(results)
    //           setCurrentCity(
    //             results.result.address_component.city
    //           )
    //           resetDate({
    //             latitude: results.result.location.lat,
    //             longitude: results.result.location.lng,
    //           })
    //         }
    //       })
    //     }
    //   }
    //   return
    // }
    //


    //设置系统模式

    Taro.setStorageSync('systemMode', 'map')
    mapRef.current = Taro.createMapContext("map");

    // const currentScale = mapRef.current.getScale()
    // setScale(currentScale)
    // setTimeout(() => {
    //   setScale(14)
    // }, 0)
    console.log(mapRef.current)
    network.Fetch({
      "obj": "user",
      "act": "contact_us"
    }).then((a) => {
      setPhone(a.platform_phone)
    })
    if (Taro.getStorageSync('currentCity') && Taro.getStorageSync('localCity').city !== Taro.getStorageSync('currentCity').city) {//以选择的城市为中心
      resetDate(Taro.getStorageSync('currentCity'))
      qqmapsdk.reverseGeocoder({
        success: function (results) {
          console.log(results)
          Taro.setStorageSync('localCity', {
            city: results.result.address_component.city, latitude: results.result.location.lat,
            longitude: results.result.location.lng
          })
        }
      })
    } else {
      qqmapsdk.reverseGeocoder({
        success: function (results) {
          console.log(results)
          Taro.setStorageSync('localCity', {
            city: results.result.address_component.city, latitude: results.result.location.lat,
            longitude: results.result.location.lng
          })
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
          {Taro.getStorageSync('currentCity') ? Taro.getStorageSync('currentCity').city : currentCity}
          <Image className='arrow' src={require('../../../assets/img/home/map_arrow.png')} />
        </View>
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
                src={downUrl + 'f16282595990667181015001'}
              /> </CoverView>
          }
          <CoverView className='iconC kefu'>   <CoverImage className='icon' onClick={() => setVisible(true)} src={require('../../../assets/img/home/map_kefu.png')} /> </CoverView>
          <CoverView className='iconC location'>    <CoverImage className='icon' onClick={() => controltap()} src={require('../../../assets/img/home/map_local.png')} /></CoverView>


          <CoverImage className='iconC open' onClick={() => Taro.navigateTo({ url: '/pages/home/codeList/index?from=map' })} src={require('../../../assets/img/home/map_open.png')} />
          <CoverImage className='iconC cont' onClick={() => Taro.navigateTo({ url: '/pages/home/continueList/index?from=map' })} src={require('../../../assets/img/home/map_cont.png')} />
          <CoverView className='distance'>距离最近茶室{distanceStr}</CoverView>
          <CoverImage className='my' src={require('../../../assets/img/home/map_my.png')} />

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
          <CoverImage className='btn' onClick={() => Taro.navigateTo({ url: `/pages/home/storeList/index?longitude=${location.longitude}&latitude=${location.latitude}` })} src={require('../../../assets/img/home/map_btn.png')}>
          </CoverImage>
          <CoverImage className='mengceng' src={require('../../../assets/img/home/map_bg.png')}></CoverImage>
        </Map>
      </View>
    </View>
  )
}
Index.config = {
  navigationBarTitleText: '名流共享茶室',
  navigationBarBackgroundColor: '#00A0E9',
  navigationBarTextStyle: 'white'
}


