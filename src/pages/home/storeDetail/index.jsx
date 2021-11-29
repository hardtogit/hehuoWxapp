import Taro, { Component, useRouter, useEffect, useState, useDidShow, useShareAppMessage } from "@tarojs/taro";
import network from '@/utils/network'
import { downUrl } from '@/config'
import { countDistance } from '@/utils'
import {
  View,
  Button,
  Video,
  Image,
  Swiper,
  SwiperItem,
  RichText
} from "@tarojs/components";
import { AtActionSheet, AtActionSheetItem } from 'taro-ui'
import classNames from 'classnames'
import ChoicePayType from '@/components/ChoicePayType'
import GetTeaArt from '@/components/GetTeaArt'
import RoomItem from "../../../components/RoomItem";
import QQMapWX from '../../../assets/js/qqmap-wx-jssdk.min.js'
import GetCoupon from "./components/GetCoupon";
import GetCard from "./components/GetCard";


import "./index.scss";

const qqmapsdk = new QQMapWX({
  key: 'CS7BZ-V2ZWQ-Q7455-G3YYK-5VSCZ-T4BQU'
});

export default function Index() {
  const router = useRouter()
  const [entity, setEntity] = useState()
  const [visiblePhone, setVisiblePhone] = useState(false)
  const [visibleOne, setVisibleOne] = useState(false)
  const [visibleTwo, setVisibletwo] = useState(false)
  const [visibleThree, setVisibleThree] = useState(false)
  const [visibleFour, setVisibleFour] = useState(false)
  const [visibleFive, setVisibleFive] = useState(false)

  const [teaArtList, setTeaArtList] = useState([])
  const [timeCard, setTimeCard] = useState({})
  const [current, setCurrent] = useState(0)
  const [type, setType] = useState('img')

  const openLocation = () => {
    Taro.openLocation({
      longitude: Number(entity.shop.longitude),
      latitude: Number(entity.shop.latitude),
      name: entity.shop.shop_name,
      address: entity.shop.address
    })
  }
  const colStore = () => {
    network.Fetch({
      "obj": "user",
      "act": "add_shop_collect",
      "shop_id": router.params.id || 'o15956078815923459529',
    }).then((res) => {
      Taro.showToast({
        title: '收藏成功',
        icon: 'none'
      })
      getData()
    })
  }
  const cancelCol = () => {
    network.Fetch({
      obj: 'user',
      act: 'del_collect',
      collect_id: entity.shop.collect_status_id,
    }).then(() => {
      Taro.showToast({
        title: '操作成功',
        icon: 'none'
      })
      getData()
    })
  }
  const getTeaArt = () => {
    //获取本店铺茶艺师
    network.Fetch({
      "obj": "user",
      "act": "list_teaarts",
      "shop_id": router.params.id || 'o15956078815923459529'
    }).then((res) => {
      setTeaArtList(res.list || [])
      // console.log(res, 'gfakjsgfjkasgfasg')
    })
  }
  const getData = () => {
    if (Taro.getStorageSync('myLocation')) {
      network.Fetch({
        "obj": "user",
        "act": "details_shops",
        "shop_id": router.params.id || 'o15956078815923459529',
        "latitude": Taro.getStorageSync('myLocation').lat,
        "longitude": Taro.getStorageSync('myLocation').lng,
      }).then((res) => {
        Taro.setNavigationBarTitle({
          title: res.shop.shop_name
        })
        const regex = new RegExp('<img', 'gi');
        res.shop.details_desc = res.shop.details_desc && res.shop.details_desc.replace(regex, '<img style="width:100%;display:block"')
        setEntity(res)
      })
    } else {
      qqmapsdk.reverseGeocoder({
        success: function (results) {
          network.Fetch({
            "obj": "user",
            "act": "details_shops",
            "shop_id": router.params.id || 'o15956078815923459529',
            "latitude": results.result.location.lat,
            "longitude": results.result.location.lng,
          }).then((res) => {
            Taro.setNavigationBarTitle({
              title: res.shop.shop_name
            })
            const regex = new RegExp('<img', 'gi');
            res.shop.details_desc = res.shop.details_desc && res.shop.details_desc.replace(regex, '<img style="width:100%;display:block"')
            setEntity(res)
          })
          Taro.setStorageSync('myLocation', results.result.location)
        }
      })
    }


  }
  const buy = (payment_type) => {
    network.Fetch({
      "obj": "user",
      "act": "add_card_user",
      "memb_id": timeCard._id,
      "shop_id": router.params.id || 'o15956078815923459529',
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
  useShareAppMessage((options) => {
    return {
      title: entity.shop.shop_name,
      path: '/pages/home/storeDetail/index?id=' + router.params.id,
    }
  })
  useDidShow(() => {
    getData()
  })
  const openPay = (selectTimeCard) => {
    setTimeCard(selectTimeCard)
    setVisibleThree(true)
  }
  return (
    <View className='store_detail'>
      {visibleThree && <ChoicePayType onOk={buy} price={timeCard.memb_price} onCancel={() => { setVisibleThree(false) }}></ChoicePayType>}
      <View className='getTeaArt'><GetTeaArt visible={visibleFour} shop_id={router.params.id || 'o15937049856544559001'} teaArtList={teaArtList} onCancel={() => setVisibleFour(false)} ></GetTeaArt> </View>
      <View className='getCoupon'> <GetCoupon visible={visibleOne} shop_id={router.params.id || 'o15937049856544559001'} onCancel={() => setVisibleOne(false)} /></View>
      <View className='getCard'><GetCard openPay={openPay} timeCards={entity.memb_card} shop_id={router.params.id || 'o15937049856544559001'} visible={visibleTwo} onCancel={() => setVisibletwo(false)}></GetCard></View>
      <View className='swiper_container'>
        <Swiper
          className='swiper'
          ndicatorDots={false}
          circular
          autoplay={false}
          onChange={(e) => {
            setCurrent(e.detail.current)
          }}
          nextMargin='60rpx'
        >
          {
            entity.shop.vadio &&
            <SwiperItem className='swiperItem'>
              <Video src={downUrl + entity.shop.vadio} className='video' />
            </SwiperItem>
          }
          {entity.shop.shop_fids.map((url) => (<SwiperItem className='swiperItem'>
            <Image
              className='slide'
              src={downUrl + url}
            ></Image>
          </SwiperItem>))}
        </Swiper>


        <View className='count'>
          {current + 1}/{entity.shop.vadio ? entity.shop.shop_fids.length + 1 : entity.shop.shop_fids.length}
        </View>




      </View>
      <View className='content'>
        <View className='title'>{entity.shop.shop_name} {entity.shop.buyinfo && <View className='buyinfo'>{entity.shop.buyinfo}</View>}</View>
        <View className='address' onClick={() => Taro.openLocation({})}>
          <View className='text'>
            <View>{entity.shop.address}</View>
            <View>{countDistance(entity.shop.distance)}</View>
          </View>
          <View className='icon' onClick={openLocation}>
            <Image className='img' src={require('../../../assets/img/home/location_icon.png')}></Image>
          </View>
        </View>
        <View className='labels'>
          {entity.shop.features_serve.map((text) => {
            return (
              <View className='label'>{text}</View>
            )
          })}
        </View>
        {(entity.shop.teaarts && entity.shop.teaarts === '开启') &&
          <View className='bar three' onClick={e => { e.stopPropagation(); getTeaArt(); setVisibleFour(true) }} style={{ backgroundImage: `url("https://shanpaokeji.com/cgi-bin/download.pl?proj=ckj2_ga&fid=f16362688122967460155001")`, backgroundSize: '100% 100%' }}>
            <Image className='left' src={require('../../../assets/img/home/item_three.png')}></Image>
            <View className='center'>本店铺茶艺师</View>
            <View className='text'>点击查看</View>
            <Image className='arrow' src={require('../../../assets/img/home/right_three.png')}></Image>
          </View>
        }
        {/* <View className='bar one' onClick={()=>Taro.navigateTo({url:`/pages/home/buyCoupon/index?id=${router.params.id||'o15937049856544559001'}`})}> */}
        <View className='bar one' onClick={(e) => { e.stopPropagation(); setVisibletwo(false); setVisibleOne(true) }}>

          <Image className='left' src={require('../../../assets/img/home/item_one.png')}></Image>
          <View className='center'>限时优惠折扣</View>
          <View className='text'>我要领取</View>
          <Image className='arrow' src={require('../../../assets/img/home/right_one.png')}></Image>
        </View>
        {/* <View className='bar two' onClick={()=>{Taro.setStorageSync('timeCards',entity.memb_card); Taro.navigateTo({url:`/pages/home/buyTimesCard/index?shop_id=${router.params.id||'o15937049856544559001'}`})}}> */}
        <View className='bar two' onClick={(e) => { e.stopPropagation(); setVisibleOne(false); setVisibletwo(true) }}>
          <Image className='left' src={require('../../../assets/img/home/item_two.png')}></Image>
          <View className='center' style={{ paddingLeft: '4px' }}>VIP会员活动</View>
          <View className='text'>购买优惠详情</View>
          <Image className='arrow' src={require('../../../assets/img/home/right_two.png')}></Image>
        </View>
        <View className='rooms'>
          <View className='item_title'>
            所有空间
          </View>
          {entity.room.map((room) => {
            return (
              <RoomItem room={room} shop_id={router.params.id} />
            )
          })}
        </View>
      </View>

      <View className='discription'>
        <View className='sub_title'>
          使用说明：
        </View>
        <RichText className='richText' nodes={entity.shop.details_desc} >

        </RichText>
      </View>

      <View className='bottom'>
        <View className='fn' onClick={() => {
          if (router.params.from === 'map') {
            Taro.reLaunch({ url: '/pages/home/map/index' })
          } else {
            Taro.switchTab({ url: '/pages/home/index' })
          }
        }} >
          <Image className='img' src={require('../../../assets/img/home/sd1.png')}></Image>
          <View className='text'>
            首页
          </View>
        </View>
        <View className='fn'>
          <Button openType='share' className='shareBtn'>
            <Image className='img' src={require('../../../assets/img/home/sd2.png')}></Image>
            <View className='text'>
              分享
            </View>
          </Button>
        </View>
        <View className='fn' onClick={() => {
          if (entity.shop.collect_status == '已收藏') {
            cancelCol()
          } else {
            colStore()
          }
        }} >
          {entity.shop.collect_status == '已收藏' ? <Image className='img start' src={require('../../../assets/img/me/start.png')}></Image> :
            <Image className='img' src={require('../../../assets/img/home/sd3.png')}></Image>
          }

          <View className='text'>
            收藏
          </View>
        </View>
        <View className='fn' onClick={() => { setVisiblePhone(true) }}>
          <Image className='img' src={require('../../../assets/img/home/sd4.png')}></Image>
          <View className='text'>
            客服
          </View>
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
    </View >
  );
}

Index.config = {
  navigationBarTitleText: '店铺',
}
