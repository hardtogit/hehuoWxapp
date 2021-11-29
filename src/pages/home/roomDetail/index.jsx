import Taro, { Component, useRouter, useEffect, useState, useDidShow, useShareAppMessage } from "@tarojs/taro";
import network from '@/utils/network'
import { AtIcon, AtActionSheet, AtActionSheetItem } from 'taro-ui'
import dayjs from 'dayjs'
import { countDistance } from '@/utils'
import arrow from '@/assets/img/me/arrow_right.png'
import classNames from 'classnames'
import ChoicePayType from '@/components/ChoicePayType'
import GetPackage from '@/components/GetPackage'
import { downUrl } from '@/config'
import {
  View,
  Button,
  Text,
  Image,
  Swiper,
  RichText,
  SwiperItem
} from "@tarojs/components";
import GetCoupon from "../storeDetail/components/GetCoupon";
import GetCard from "../storeDetail/components/GetCard";
import TimePicker from "../../../components/TimePicker";
import "./index.scss";
import QQMapWX from "../../../assets/js/qqmap-wx-jssdk.min";

const qqmapsdk = new QQMapWX({
  key: 'CS7BZ-V2ZWQ-Q7455-G3YYK-5VSCZ-T4BQU'
});
export default function Index() {
  const router = useRouter()
  const [room, setRoom] = useState({ room: {} })
  const [entity, setEntity] = useState({ shop: {} })
  const [visiblePhone, setVisiblePhone] = useState(false)
  const [visibleTimeScope, setVisibleTimeScope] = useState(false)
  const [visibleOne, setVisibleOne] = useState(false)
  const [visibleTwo, setVisibletwo] = useState(false)
  let [timeScope, setTimeScope] = useState()
  const [visibleThree, setVisibleThree] = useState(false)
  const [visibleFive, setVisibleFive] = useState(false)
  const [timeCard, setTimeCard] = useState({})
  const [packageList, setPackageList] = useState([])
  const [selectPackage, setSelectPackage] = useState(null)
  const [current, setCurrent] = useState(0)
  const buttonPosition = Taro.getMenuButtonBoundingClientRect()
  // useDidShow(()=>{
  //   const appointmentTimeScope=Taro.getStorageSync('appointmentTimeScope')
  //   setTimeScope(appointmentTimeScope)
  //   // Taro.removeStorageSync('appointmentTimeScope')
  // })
  const openLocation = () => {
    console.log(entity.shop)
    Taro.openLocation({
      longitude: Number(entity.shop.longitude),
      latitude: Number(entity.shop.latitude),
      name: entity.shop.shop_name,
      address: entity.shop.address
    })
  }
  useShareAppMessage((options) => {
    return {
      title: room.room.room_name,
      path: '/pages/home/roomDetail/index?id=' + router.params.id + '&shop_id=' + router.params.shop_id,
    }
  })
  useEffect(() => {
    Taro.removeStorageSync('sureOrderData')
    if (Taro.getStorageSync('myLocation')) {
      network.Fetch({
        "obj": "user",
        "act": "details_shops",
        "shop_id": router.params.shop_id || 'o15979071007186889648',
        "latitude": Taro.getStorageSync('myLocation').lat,
        "longitude": Taro.getStorageSync('myLocation').lng,
      }).then((res) => {
        Taro.setNavigationBarTitle({
          title: res.shop.shop_name
        })
        setEntity(res)
      })
    } else {
      qqmapsdk.reverseGeocoder({
        success: function (results) {
          network.Fetch({
            "obj": "user",
            "act": "details_shops",
            "shop_id": router.params.shop_id || 'o15979071007186889648',
            "latitude": results.result.location.lat,
            "longitude": results.result.location.lng,
          }).then((res) => {
            Taro.setNavigationBarTitle({
              title: res.shop.shop_name
            })
            setEntity(res)
          })
          Taro.setStorageSync('myLocation', results.result.location)
        }
      })
    }

    network.Fetch({
      "obj": "user",
      "act": "single_room",
      "room_id": router.params.id || 'o15979078737097969055'
    }).then(data => {
      const regex = new RegExp('<img', 'gi');
      data.room.details_desc = data.room.details_desc && data.room.details_desc.replace(regex, '<img style="width:100%;display:block"')
      setRoom(data)
      if (data.room.price.type === '一口价') {
        getPackage({})
      }
    })
  }, [])
  const goCount = () => {
    //TODO验证

    console.log(timeScope)

    return
    Taro.setStorageSync('orderInfo',)
    Taro.navigateTo({ url: '/pages/home/sureOrder/index' })
  }
  const buy = (payment_type) => {
    network.Fetch({
      "obj": "user",
      "act": "add_card_user",
      "memb_id": timeCard._id,
      "shop_id": router.params.shop_id || 'o15979071007186889648',
      payment_type
    }).then((data) => {
      setVisibleThree(false)
      if (payment_type == 'balance') {
        Taro.showToast({
          title: '购买成功',
          icon: 'none'
        })
        setTimeout(() => {
          Taro.navigateBack({})
        }, 1000)
        return
      }
      Taro.requestPayment({
        ...data.pay_info,
        success: function () {
          Taro.showToast({
            title: '购买成功',
            icon: 'none'
          })
          setTimeout(() => {
            Taro.navigateBack({})
          }, 1000)
        }
      })
    })
  }
  const openPay = (selectTimeCard) => {
    setTimeCard(selectTimeCard)
    setVisibleThree(true)
  }
  const getPackage = (currentTimeScope) => {
    network.Fetch({
      "obj": "user",
      "act": "combo_room",
      "room_id": router.params.id || 'o15979078737097969055',
      "hour": (currentTimeScope.endTime - currentTimeScope.startTime) / 3600,
      "begin_time": currentTimeScope.startTime,
      "end_time": currentTimeScope.endTime
    }).then((data) => {
      // setTimeout(() => {
      if (data.list.length !== 0) {
        const result = data.list.map((item, i) => {
          return {
            ...item,
            products: item.products.map((value, j) => {
              return {
                ...value,
                selected: j === 0 ? true : false
              }
            }),
            selected: false,
            visible: false
          }
        })
        setPackageList(result)
        setVisibleFive(true)
      }
      // }, 500)

      console.log(data, 'gfkasgfkasgf')
    })
  }
  const setTimeScopeFn = (currentTimeScope) => {
    setSelectPackage(null)
    getPackage(currentTimeScope)
    setTimeScope(currentTimeScope)
  }
  //选择了套餐
  let price = 0
  let orginPrice = 0
  let showTimeScope = { ...timeScope }
  console.log(selectPackage, '选中的套餐')
  if (selectPackage) {
    if (room.room.price.type === '时段价') {
      price = selectPackage.money
      orginPrice = selectPackage.originPrice
      showTimeScope = {
        startTime: showTimeScope.startTime,
        endTime: showTimeScope.startTime + 3600 * selectPackage.hour
      }
    } else {
      price = selectPackage.money
      orginPrice = selectPackage.originPrice
    }
  }
  // console.log(timeScope)
  // `预约时间：${dayjs(timeScope.startTime*1000).format('MM月DD日 HH:ss')} - ${dayjs(timeScope.endTime*1000).format('MM月DD日 HH:ss')}`
  return (
    <View className='store_detail'>
      <View className='getTime'> <TimePicker room={room} shop_id={room.room.shop_id || 'o15979071007186889648'} tea_zone_id={room.room._id || 'o15979078737097969055'} visible={visibleTimeScope} setTimeScopeFn={setTimeScopeFn} onCancel={() => { setVisibleTimeScope(false) }}></TimePicker></View>
      <View className='getPackage'>{visibleFive && <GetPackage onSelectPackage={(pack) => {
        if (pack) {
          if (room.room.price.type === '时段价') {
            // setTimeScope({
            //   startTime: timeScope.startTime,
            //   endTime: timeScope.startTime + 3600 * pack.hour
            // })
          }
        }
        setSelectPackage(pack)
      }} room={room.room} timeScope={timeScope} packageList={packageList} onPackageList={setPackageList} visible={visibleFive} shop_id={router.params.id || 'o15937049856544559001'} onCancel={() => setVisibleFive(false)} ></GetPackage>} </View>
      {visibleThree && <ChoicePayType onOk={buy} price={timeCard.memb_price} onCancel={() => { setVisibleThree(false) }}></ChoicePayType>}
      <View className='getCoupon'> <GetCoupon visible={visibleOne} shop_id={router.params.shop_id || 'o15937049856544559001'} onCancel={() => setVisibleOne(false)} /></View>
      <View className='getCard'><GetCard openPay={openPay} timeCards={entity.memb_card} shop_id={router.params.shop_id || 'o15937049856544559001'} visible={visibleTwo} onCancel={() => setVisibletwo(false)}></GetCard></View>
      <View className='navBar' style={{ top: `${buttonPosition.top}px`, height: `${buttonPosition.height}px`, paddingRight: `${buttonPosition.width + 20}px` }}>
        <AtIcon value='chevron-left' color='#fff' size={28} onClick={() => {
          if (Taro.getCurrentPages().length > 1) {
            Taro.navigateBack({})
          } else {
            Taro.reLaunch({ url: '/pages/home/index' })
          }
        }} ></AtIcon>
        <View className='right'>
          <Button style={{ width: `${buttonPosition.height}px`, height: `${buttonPosition.height}px` }} openType='share' className='shareBtn'> <Image className='icon' src={require('../../../assets/img/home/share.png')}></Image></Button>
        </View>

      </View>
      <View className='swiper_container'>
        <View className='count'>
          {current + 1}/{room.room.shop_fids.length}
        </View>
        <Swiper
          className='swiper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots={false}
          onChange={(e) => {
            setCurrent(e.detail.current)
          }}
          autoplay
        >
          {room.room.shop_fids.map((url) => {
            return (
              <SwiperItem>
                <Image
                  className='slide'
                  src={downUrl + url}
                ></Image>
              </SwiperItem>
            )
          })}
        </Swiper>
      </View>
      <View className='content'>
        <View className='box'>
          <View className='price'>
            <View className='unit'>¥</View>
            {room.room.price.type === '时段价' ? <View className='num'>{timeScope ? room.room.price.money * 2 * (timeScope.endTime - timeScope.startTime) / 3600 : room.room.price.money * 2}</View> : <View className='num'>{room.room.price.money}<Text className='yuan'>元</Text> </View>}
            {room.room.price.type === '时段价' && <View className='text'>起</View>}
          </View>
        </View>
        <View className='title'>{room.room.room_name}</View>
        <View className='tips'>
          <View className='tip'>
            <Image className='icon' src={require('../../../assets/img/me/room_one.png')}></Image>
            <View className='text'>以预约时间为准</View>
          </View>
          <View className='tip'>
            <Image className='icon' src={require('../../../assets/img/me/room_two.png')}></Image>
            <View className='text'>{room.room.room_size}平米</View>
          </View>
          <View className='tip'>
            <Image className='icon' src={require('../../../assets/img/me/room_three.png')}></Image>
            <View className='text'>{room.room.number}人</View>
          </View>
        </View>
        <View className='address' onClick={() => openLocation()}>
          <View className='text'>
            <View>{entity.shop.address}</View>
            <View>{countDistance(entity.shop.distance)}</View>
          </View>
          <View className='icon'>
            <Image className='img' src={require('../../../assets/img/me/room_ad.png')}></Image>
          </View>
          <Image className='arrow' src={require('../../../assets/img/me/arrow_right.png')}></Image>
        </View>
        {/*<View className='labels'>*/}
        {/*  {entity.shop.features_serve.map((text)=>{*/}
        {/*      return (*/}
        {/*      <View className='label'>{text}</View>*/}
        {/*      )*/}
        {/*  })}*/}
        {/*</View>*/}
        {room.room.price.type === '时段价' &&
          <View className='bar three' onClick={() => setVisibleTimeScope(true)}>
            <Image className='icon' src={require('../../../assets/img/home/time_icon.png')}></Image>
            <View className='text'>
              {timeScope ? `预约时间:${dayjs(timeScope.startTime * 1000).format('MM月DD日 HH:mm')} - ${dayjs(timeScope.endTime * 1000).format('MM月DD日 HH:mm')}` : '点击选择时间'}
            </View>
            <Image className='arrow' src={require('../../../assets/img/home/time_arrow.png')}></Image>
          </View>
        }
        {/* <View className='bar one' onClick={()=>Taro.navigateTo({url:`/pages/home/buyCoupon/index?id=${room.room.shop_id||'o15937049856544559001'}`})}> */}
        <View className='bar one' onClick={() => { setVisibletwo(false); setVisibleOne(true) }}>
          <Image className='left' src={require('../../../assets/img/home/item_one.png')}></Image>
          <View className='center'>限时优惠折扣</View>
          <View className='text'>我要领取</View>
          <Image className='arrow' src={require('../../../assets/img/home/right_one.png')}></Image>
        </View>
        {/* <View className='bar two' onClick={()=>{Taro.setStorageSync('timeCards',room.memb_card); Taro.navigateTo({url:`/pages/home/buyTimesCard/index?shop_id=${router.params.id||'o15937049856544559001'}`})}}> */}

        {/* {room.room.price.type === '时段价' && */}
        <View className='bar two' onClick={() => { setVisibleOne(false); setVisibletwo(true) }}>
          <Image className='left' src={require('../../../assets/img/home/item_two.png')}></Image>
          <View className='center'>VIP会员活动</View>
          <View className='text'>购买优惠详情</View>
          <Image className='arrow' src={require('../../../assets/img/home/right_two.png')}></Image>
        </View>
        {/* } */}


        <View className='discription'>
          <View className='sub_title'>
            使用说明：
          </View>
          <RichText className='richText' nodes={room.room.details_desc} >

          </RichText>
        </View>
      </View>
      <View className='bottom'>
        <View className='service' onClick={() => { setVisiblePhone(true) }}>
          <Image className='icon' src={require('../../../assets/img/me/room_five.png')}>
          </Image>
          <View className='text'>
            电话
          </View>
        </View>
        {
          selectPackage ?
            <View className="packagePrice">
              <View className='price'>
                <View className='unit'>¥</View>
                <View className='num'>
                  {price}
                </View>
                <View style={{ color: '#999', textDecoration: 'line-through', marginLeft: '2px', fontSize: '24rpx' }}>¥{orginPrice}</View>
                {/* {room.room.price.type === '时段价' ? <View className='num'>{timeScope ? room.room.price.money * 2 * (timeScope.endTime - timeScope.startTime) / 3600 : room.room.price.money * 2}</View> : <View className='num'>{room.room.price.money} <Text className='yuan' >元</Text> </View>} */}
                {/* <Text style={{ width: '4px' }}> </Text> */}
                {/* {room.room.price.type === '时段价' && <View className='text'>{timeScope ? `${parseInt((timeScope.endTime - timeScope.startTime) / 3600)}小时${(timeScope.endTime - timeScope.startTime) % 3600 != 0 ? ((timeScope.endTime - timeScope.startTime) % 3600) / 60 + '分钟' : ''}` : '起'}</View>} */}
              </View>
              <View className='trigger' onClick={() => { setVisibleFive(true) }}>
                查看详情
                <Image className={classNames(['icon', entity.visible && 'flip'])} src={arrow}></Image>
              </View>
            </View> :
            <View className='price'>
              <View className='unit'>¥</View>
              {room.room.price.type === '时段价' ? <View className='num'>{timeScope ? room.room.price.money * 2 * (timeScope.endTime - timeScope.startTime) / 3600 : room.room.price.money * 2}</View> : <View className='num'>{room.room.price.money} <Text className='yuan' >元</Text> </View>}
              <Text style={{ width: '4px' }}> </Text>
              {room.room.price.type === '时段价' && <View className='text'>{timeScope ? `${parseInt((timeScope.endTime - timeScope.startTime) / 3600)}小时${(timeScope.endTime - timeScope.startTime) % 3600 != 0 ? ((timeScope.endTime - timeScope.startTime) % 3600) / 60 + '分钟' : ''}` : '起'}</View>}
            </View>
        }
        <View className='btn' onClick={goCount}>
          {/* {timeScope.length!==0?<View onClick={()=>Taro.navigateTo({url:`/pages/home/sureOrder/index?id=${room.room._id}&type=1`})}>去结算</View>:<View onClick={()=>Taro.navigateTo({url:`/pages/home/appointment/index?shop_id=${room.room.shop_id||'o15937049856544559001'}&tea_zone_id=${router.params.id||'o15937054688063290119'}`})}>去预约</View>} */}
          {room.room.price.type === '时段价' ?
            timeScope ? <View onClick={() => {
              if (selectPackage) {
                Taro.setStorageSync('sureOrderData', {
                  timeScope: {
                    startTime: timeScope.startTime,
                    endTime: timeScope.startTime + 3600 * selectPackage.hour
                  },
                  price: selectPackage.money,
                  package: selectPackage
                });
              } else {
                Taro.setStorageSync('sureOrderData', {
                  timeScope,
                  price: room.room.price.money * (timeScope.endTime - timeScope.startTime) / 3600 * 2
                });
              }
              Taro.navigateTo({ url: `/pages/home/sureOrder/index?id=${room.room._id}&type=2` })
            }}
            >去结算</View> : <View onClick={() => setVisibleTimeScope(true)}>去预约</View> :
            <View onClick={() => {
              if (selectPackage) {
                Taro.setStorageSync('sureOrderData', {
                  timeScope: {
                    startTime: 0,
                    endTime: 0
                  },
                  price: selectPackage.money,
                  package: selectPackage
                });
              }




              Taro.navigateTo({ url: `/pages/home/sureOrder/index?id=${room.room._id}&type=1` })
            }}>去结算</View>
          }
        </View>
      </View>
      <AtActionSheet isOpened={visiblePhone} cancelText='取消' onClose={() => setVisiblePhone(false)} >
        <AtActionSheetItem>
          {entity.shop.serve_phone}
        </AtActionSheetItem>
        <AtActionSheetItem onClick={() => { Taro.makePhoneCall({ phoneNumber: '' + entity.shop.serve_phone }) }}>
          呼叫
        </AtActionSheetItem>
      </AtActionSheet>
    </View>
  );
}
Index.config = {
  navigationStyle: 'custom',
  navigationBarTitleText: '店铺',
}
