import Taro, { Component, useState, useRouter, useEffect, useDidShow } from "@tarojs/taro";
import classNames from 'classnames'
import dayjs from 'dayjs'
import { View, Button, Text, Image, Icon } from "@tarojs/components";
import ChoicePayType from '@/components/ChoicePayType'
import GetTeaArt from '@/components/GetTeaArt'
import network from '@/utils/network'
import { computeNumber } from '@/utils'
import { downUrl } from '../../../config/index'

import "./index.scss";


export default function Index() {
  const [checked, setChecked] = useState(false)
  const [visible, setVisible] = useState(false)
  const [visibleTwo, setVisibleTwo] = useState(false)
  const [teaart, setTeaart] = useState()
  const [teaArtList, setTeaArtList] = useState([])
  const router = useRouter()
  const [room, setRoom] = useState({})
  const [discount, setDiscount] = useState()
  const sureOrderData = Taro.getStorageSync('sureOrderData')
  const continueOrder = Taro.getStorageSync('continueOrder')
  let money = 0;
  let realMoney = 0;
  console.log(router.params.type)
  if (router.params.type == 2) {
    money = sureOrderData.price;
    realMoney = sureOrderData.price
  } else {
    money = room.room ? room.room.price.money : 0
    realMoney = room.room ? room.room.price.money : 0
  }
  console.log(dayjs(dayjs(sureOrderData.timeScope.startTime * 1000).format('YYYY-MM-DD')).unix())
  //有茶艺师
  if (teaart) {
    if (router.params.type == 2) {//时段价房间
      let serviceTime = sureOrderData.timeScope.endTime - sureOrderData.timeScope.startTime
      if (sureOrderData.timeScope.startTime < (dayjs(dayjs(sureOrderData.timeScope.startTime * 1000).format('YYYY-MM-DD')).unix() + teaart.realstarttime)) {
        //说明预约的昨天的时间段
        if (sureOrderData.timeScope.endTime > (dayjs(dayjs(sureOrderData.timeScope.startTime * 1000).subtract(1, 'd').format('YYYY-MM-DD')).unix() + teaart.realendtime)) {//表示茶艺师已下班
          serviceTime = dayjs(dayjs(sureOrderData.timeScope.startTime * 1000).subtract(1, 'd').format('YYYY-MM-DD')).unix() + teaart.realendtime - sureOrderData.timeScope.startTime
        }
      } else {
        if (sureOrderData.timeScope.endTime > (dayjs(dayjs(sureOrderData.timeScope.startTime * 1000).format('YYYY-MM-DD')).unix() + teaart.realendtime)) {//表示茶艺师已下班
          serviceTime = dayjs(dayjs(sureOrderData.timeScope.startTime * 1000).format('YYYY-MM-DD')).unix() + teaart.realendtime - sureOrderData.timeScope.startTime
        }
      }
      money = computeNumber(teaart.cost, '*', serviceTime / 3600).next('+', money).result
      realMoney = computeNumber(teaart.cost, '*', serviceTime / 3600).next('+', realMoney).result
    } else {
      money = computeNumber(money, '+', teaart.cost).result
      realMoney = computeNumber(realMoney, '+', teaart.cost).result
    }
  }

  if (discount) {
    if (discount.type == '优惠券') {
      realMoney = realMoney - discount.coupon.disc_off_price < 0 ? 0 : computeNumber(realMoney, '-', discount.coupon.disc_off_price).result
    } else {
      if (discount.coupon.memb_off_time * room.room.price.money * 2 > sureOrderData.price) {
        realMoney = computeNumber(realMoney, '-', sureOrderData.price).result
      } else {
        realMoney = computeNumber(realMoney, '-', discount.coupon.memb_off_time * room.room.price.money * 2).result < 0 ? 0 : computeNumber(realMoney, '-', discount.coupon.memb_off_time * room.room.price.money * 2).result
      }
    }
  }
  money = parseFloat(money).toFixed(2)
  realMoney = parseFloat(realMoney).toFixed(2)
  useDidShow(() => {
    const selectDiscount = Taro.getStorageSync('discount')
    setDiscount(selectDiscount)
    Taro.removeStorageSync('discount')
  })
  const getTeaarts = () => {
    const params = {
      "obj": "user",
      "act": "seclist_teaarts",
      "room_id": router.params.id || 'o15956083697860679626',
      "begin_time": router.params.type == 2 ? sureOrderData.timeScope.startTime : '',
      "end_time": router.params.type == 2 ? sureOrderData.timeScope.endTime : ''
    }
    if (continueOrder && continueOrder._id && router.params.way) {
      params.order_id = continueOrder._id
    }
    //获取本店铺茶艺师
    network.Fetch(params).then((res) => {
      setTeaArtList(res.list || [])
      // console.log(res, 'gfakjsgfjkasgfasg')
    })
  }
  useEffect(() => {
    network.Fetch({
      "obj": "user",
      "act": "single_room",
      "room_id": router.params.id || 'o15956083697860679626'
    }).then(data => setRoom(data))

  }, [])
  const buy = (payment_type) => {
    Taro.showLoading({
      title: '处理中，请稍后...',
      mask: true
    })
    let params = {}
    if (router.params.type == 2) {
      if (discount) {
        params = {
          "obj": "user",
          "act": "generate_order",
          order_type: router.params.way ? '续单' : '首次',
          "room_id": router.params.id || 'o15951435145368449687',
          "service_time": {
            "begin_time": router.params.type == 2 ? sureOrderData.timeScope.startTime : '',
            "end_time": router.params.type == 2 ? sureOrderData.timeScope.endTime : ''
          },
          original_amount: money,
          reservation_data: dayjs(dayjs(sureOrderData.timeScope.startTime * 1000).format('YYYY-MM-DD')).unix(),
          "discount": {
            "type": discount.type,
            "discount_id": discount.coupon._id
          },
          "payment_amount": realMoney,
          "payment_type": payment_type,
        }
      } else {
        params = {
          "obj": "user",
          "act": "generate_order",
          order_type: router.params.way ? '续单' : '首次',
          "room_id": router.params.id || 'o15951435145368449687',
          "service_time": {
            "begin_time": router.params.type == 2 ? sureOrderData.timeScope.startTime : '',
            "end_time": router.params.type == 2 ? sureOrderData.timeScope.endTime : ''
          },
          original_amount: money,
          reservation_data: dayjs(dayjs(sureOrderData.timeScope.startTime * 1000).format('YYYY-MM-DD')).unix(),
          "payment_amount": realMoney,
          "payment_type": payment_type
        }
      }
    } else {
      if (discount) {
        params = {
          "obj": "user",
          "act": "generate_order",
          order_type: '首次',
          "room_id": router.params.id || 'o15942139490885128974',
          original_amount: money,
          "discount": {
            "type": discount.type,
            "discount_id": discount.coupon._id
          },
          "payment_amount": realMoney,
          "payment_type": payment_type,
          "reservation_data": dayjs(dayjs().format('YYYY-MM-DD')).unix()
        }
      } else {
        params = {
          "obj": "user",
          "act": "generate_order",
          order_type: '首次',
          "room_id": router.params.id || 'o15942139490885128974',
          original_amount: money,
          "payment_amount": realMoney,
          "payment_type": payment_type,
          "reservation_data": dayjs(dayjs().format('YYYY-MM-DD')).unix()
        }
      }
    }
    if (continueOrder && continueOrder._id && router.params.way) {
      params.order_id = continueOrder._id
    }
    //茶艺师
    if (teaart) {
      params.teaartid = teaart._id
    }
    network.Fetch(params).then((res) => {
      Taro.removeStorageSync('appointmentTimeScope');
      Taro.hideLoading({})
      setVisible(false)
      if (payment_type === 'balance' || realMoney == 0) {
        Taro.setStorageSync('currentOrder', res.order)
        Taro.redirectTo({ url: `/pages/home/success/index?id=${res.order._id}` })
      } else {
        Taro.requestPayment({
          ...res.pay_info,
          success: () => {
            Taro.setStorageSync('currentOrder', res.order)
            Taro.redirectTo({ url: `/pages/home/success/index?id=${res.order._id}` })
          },
          fail: () => {
            Taro.navigateBack({})
          }
        })
      }
    })
  }
  const createOrder = () => {
    if (!checked) {
      Taro.showToast({
        title: '请先阅读并同意协议',
        icon: 'none'
      })
      return
    }
    setVisible(true)
  }
  const goOne = () => {
    let total = 0
    let startTime = sureOrderData ? sureOrderData.timeScope.startTime : ''
    let endTime = sureOrderData ? sureOrderData.timeScope.endTime : ''

    if (router.params.type == 2) {
      total = sureOrderData.price
    } else {
      total = room.room && room.room.price.money
    }
    if (discount && discount.type == '优惠券') {
      Taro.navigateTo({ url: `/pages/home/selectCoupon/index?id=${room.room.shop_id}&couponId=${discount.coupon._id}&type=1&price=${total}&startTime=${startTime}&endTime=${endTime}` })
    } else {
      Taro.navigateTo({ url: `/pages/home/selectCoupon/index?id=${room.room.shop_id}&price=${total}&type=1&startTime=${startTime}&endTime=${endTime}` })
    }

  }
  const combSetTeaart = (currentTeaart) => {
    console.log(currentTeaart)
    if (!currentTeaart || router.params.type != 2) {
      setTeaart(currentTeaart)
      return
    }
    let serviceTime = sureOrderData.timeScope.endTime - sureOrderData.timeScope.startTime
    let isOut = false;
    if (sureOrderData.timeScope.startTime < (dayjs(dayjs(sureOrderData.timeScope.startTime * 1000).format('YYYY-MM-DD')).unix() + currentTeaart.realstarttime)) {
      //说明预约的昨天的时间段
      if (sureOrderData.timeScope.endTime > (dayjs(dayjs(sureOrderData.timeScope.startTime * 1000).subtract(1, 'd').format('YYYY-MM-DD')).unix() + currentTeaart.realendtime)) {//表示茶艺师已下班
        isOut = true
        serviceTime = dayjs(dayjs(sureOrderData.timeScope.startTime * 1000).subtract(1, 'd').format('YYYY-MM-DD')).unix() + currentTeaart.realendtime - sureOrderData.timeScope.startTime
      }
    } else {
      if (sureOrderData.timeScope.endTime > (dayjs(dayjs(sureOrderData.timeScope.startTime * 1000).format('YYYY-MM-DD')).unix() + currentTeaart.realendtime)) {//表示茶艺师已下班
        isOut = true
        serviceTime = dayjs(dayjs(sureOrderData.timeScope.startTime * 1000).format('YYYY-MM-DD')).unix() + currentTeaart.realendtime - sureOrderData.timeScope.startTime
      }
    }
    if (router.params.way) {//来自续单
      if (continueOrder.teaart_info && (continueOrder.teaart_info._id == currentTeaart._id)) {//之前订单有预约茶艺师
        if (isOut) {//茶艺师服务时长不能覆盖预约时长
          // const afterWork=
          Taro.showToast({ title: `茶艺师${currentTeaart.time.split('-')[1]}点下班，可服务时长${serviceTime / 3600}小时（消费${computeNumber((serviceTime / 3600), '*', currentTeaart.cost).result}元）`, icon: 'none', duration: 2000 })
        }
      } else {
        if (serviceTime / 3600 < 1) {
          if (isOut) {
            return Taro.showToast({ title: '即将下班不可预约', icon: 'none' })
          }
          return Taro.showToast({ title: '1小时起预约', icon: 'none' })
        }
        if (isOut) {//茶艺师服务时长不能覆盖预约时长
          // const afterWork=
          Taro.showToast({ title: `茶艺师${currentTeaart.time.split('-')[1]}点下班，可服务时长${serviceTime / 3600}小时（消费${computeNumber((serviceTime / 3600), '*', currentTeaart.cost).result}元）`, icon: 'none', duration: 2000 })
        }
      }
    } else {
      if (serviceTime / 3600 < 1) {
        if (isOut) {
          return Taro.showToast({ title: '即将下班不可预约', icon: 'none' })
        }
        return Taro.showToast({ title: '1小时起预约', icon: 'none' })
      }
      if (isOut) {//茶艺师服务时长不能覆盖预约时长
        // const afterWork=
        Taro.showToast({ title: `茶艺师${currentTeaart.time.split('-')[1]}点下班，可服务时长${serviceTime / 3600}小时（消费${computeNumber((serviceTime / 3600), '*', currentTeaart.cost).result}元）`, icon: 'none', duration: 2000 })
      }
    }



    setTeaart(currentTeaart)
  }
  return (
    <View className='sureOrder'>
      {visible && <ChoicePayType onOk={buy} price={realMoney} onCancel={() => { setVisible(false) }}></ChoicePayType>}
      <View className='getTeaArt'><GetTeaArt type='choice' teaArtList={teaArtList} teaart={teaart} setTeaart={combSetTeaart} visible={visibleTwo} shop_id={router.params.id || 'o15937049856544559001'} onCancel={() => setVisibleTwo(false)} ></GetTeaArt> </View>
      <View className='card'>
        <View className='top'>
          <Image className='img' src={downUrl + room.room.shop_fids[0]}></Image>
          <View className='name'>{room.room.room_name}</View>
        </View>
        <View className='item'>
          <View className='left'>服务时间：</View>
          <View className='right'>{router.params.type == 2 ? `${dayjs(sureOrderData.timeScope.startTime * 1000).format('MM月DD日 HH:mm')} - ${dayjs(sureOrderData.timeScope.endTime * 1000).format('MM月DD日 HH:mm')}` : '商家一口价时段'}</View>
        </View>
        <View className='item'>
          <View className='left'>服务时长：</View>
          <View className='right'>{router.params.type == 2 ? `${parseInt((sureOrderData.timeScope.endTime - sureOrderData.timeScope.startTime) / 3600)}小时${(sureOrderData.timeScope.endTime - sureOrderData.timeScope.startTime) % 3600 != 0 ? ((sureOrderData.timeScope.endTime - sureOrderData.timeScope.startTime) % 3600) / 60 + '分钟' : ''}` : '商家一口价时长'} </View>
        </View>
        <View className='item'>
          <View className='left'>优惠金额：</View>
          <View className='right'>{(discount && discount.type == '优惠券') ? <Text style={{ color: 'red' }}>{discount.coupon.disc_off_price}</Text> : '-'}</View>
        </View>
        <View className='item'>
          <View className='left'>次卡抵用：</View>
          <View className='right'>{(discount && discount.type == '次卡') ? <Text style={{ color: 'red' }}>{`${discount.coupon.memb_off_time}小时/${discount.coupon.memb_off_time * room.room.price.money * 2}`}</Text> : '-'}</View>
        </View>
        <View className='item'>
          <View className='left'>应付金额：</View>
          <View className='right'>{money}</View>
        </View>
        <View className='item'>
          <View className='left'>实付金额：</View>
          <View className='right'>{realMoney}</View>
        </View>
        {
          (room.teaarts && room.teaarts === '开启') &&
          <View className='bar three' onClick={e => {
            e.stopPropagation();
            getTeaarts()
            setVisibleTwo(true)
          }} style={{ backgroundImage: `url("https://shanpaokeji.com/cgi-bin/download.pl?proj=ckj2_ga&fid=f16362688122967460155001")`, backgroundSize: '100% 100%' }}>
            <Image className='left' src={require('../../../assets/img/home/item_three.png')}></Image>
            <View className='center'>请选择跟单茶艺师</View>
            <View className='text'>点击查看</View>
            <Image className='arrow' src={require('../../../assets/img/home/right_three.png')}></Image>
          </View>
        }
      </View>
      <View className='card two'>
        <View className='cell' onClick={goOne}>
          <View className='left'>
            <Image className='icona' src={require('../../../assets/img/home/coupon.png')}></Image>  优惠券选择
          </View>
          <View className='right'>
            <Image className='icon' src={require('../../../assets/img/me/arrow_right.png')}></Image>
          </View>
        </View>
        {router.params.type == 2 &&
          <View className='cell' onClick={() => Taro.navigateTo({ url: `/pages/home/selectTimeCard/index?id=${room.room.shop_id}&startTime=${sureOrderData.timeScope.startTime}&endTime=${sureOrderData.timeScope.endTime}` })}>
            <View className='left'>
              <Image className='icona' src={require('../../../assets/img/home/card.png')}></Image>
              次卡选择
            </View>
            <View className='right'>
              <Image className='icon' src={require('../../../assets/img/me/arrow_right.png')}></Image>
            </View>
          </View>
        }

      </View>
      <View className='three card'>
        <View className='title'>温馨提示</View>
        <View className='text'>1.如空间无占用情况，可提前15分钟扫描进入</View>
        <View className='text'>2.空间设有自动售货机，如有需要可自行扫描购买</View>
        <View className='text'>3.请把握好使用时间，空间将在时间结束后断开电源</View>
        <View className='text'>4.空间一旦预订成功后不支持退单</View>

      </View>
      <View className='card two fixed'>
        <View className='cell' >
          <View className='left' onClick={() => setChecked(!checked)}>
            {!checked && <View style={{ width: '22px', height: '22px' }} className={classNames(['checkbox', checked && 'active'])}></View>}
            {checked && <Icon className='gou' type={'success'} color="#00A0E9" size={22}></Icon>}
            请详细阅读名流用户协议，同意后付款
          </View>
          <View className='right' onClick={() => Taro.navigateTo({ url: '/pages/home/doc/index' })}>
            <Image className='icon' src={require('../../../assets/img/me/arrow_right.png')}></Image>
          </View>
        </View>
      </View>
      <View className='bottom'>
        <View className='price'>
          <View className='unit'>¥</View>
          <View className='num'>{realMoney}</View>
        </View>
        <View className='btn' onClick={createOrder}>
          去支付
        </View>

      </View>
    </View>
  )
}
Index.config = {
  navigationBarTitleText: '确认订单'
}


