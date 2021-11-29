import Taro, { Component, useEffect, useState, useRouter, useCallback } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import { AtFloatLayout } from 'taro-ui'
import classNames from 'classnames'
import network from '@/utils/network'
import dayjs from 'dayjs'
import laba from '@/assets/img/home/laba.png'
import PackageCard from '../PackageCard'

import "./index.scss";



export default (props) => {
  const { onCancel, visible, packageList, onPackageList, room, timeScope, onSelectPackage } = props
  const [coupons, setCoupons] = useState([])
  const setPackageListFn = useCallback(
    (pack, type) => {
      const newPackageList = packageList.map((item) => {
        if (item._id === pack._id) {
          return {
            ...pack
          }
        }
        if (type === 'select') {
          return { ...item, selected: false }
        }
        return { ...item }
      })
      onPackageList(newPackageList)
    },
    [packageList],
  )
  const handleCancel = () => {
    const newPackageList = packageList.map((item) => {
      return { ...item, selected: false }
    })
    onPackageList(newPackageList)
    onSelectPackage(null)
    onCancel()
  }
  const handleOk = () => {
    const selectedArr = packageList.filter((item) => {
      return item.selected
    })
    if (selectedArr.length === 0) {
      Taro.showToast({ title: '请先选择套餐', icon: 'none' })
    } else {
      onSelectPackage(selectedArr[0])
      // //去结算
      // if (room.price.type === '时段价') {
      //   Taro.setStorageSync('sureOrderData', {
      //     timeScope: {
      //       startTime: timeScope.startTime,
      //       endTime: timeScope.startTime + 3600 * selectedArr[0].hour
      //     },
      //     price: selectedArr[0].money,
      //     package: selectedArr[0]
      //   });
      //   // Taro.navigateTo({ url: `/pages/home/sureOrder/index?id=${room._id}&type=2` })
      // } else {
      //   Taro.setStorageSync('sureOrderData', {
      //     timeScope: {
      //       startTime: 0,
      //       endTime: 0
      //     },
      //     price: selectedArr[0].money,
      //     package: selectedArr[0]
      //   });
      //   // Taro.navigateTo({ url: `/pages/home/sureOrder/index?id=${room._id}&type=1` })
      //   onCancel()
      // }
      onCancel()
    }

  }
  return (
    <View className='getTeaArt'>
      <AtFloatLayout isOpened={visible} onClose={onCancel}>
        <View className='modal'>
          <View className='header' onClick={onCancel}>
            <View className='left'><Image className='icon' src={laba} /> 为你推荐套餐，蓝色为已选中</View>
          </View>
          <ScrollView scrollY={true} className='all'>
            {
              packageList.map((item) => {
                return (
                  <PackageCard key={item._id} entity={item} onPackageListFn={setPackageListFn} room={room} timeScope={timeScope} />
                )
              })
            }

          </ScrollView>
          <View className='btns'>
            <View className='btn cancel' onClick={() => handleCancel()}>
              不用，谢谢
            </View>
            <View className='btn' onClick={handleOk}>
              确定
            </View>
          </View>
        </View>
      </AtFloatLayout>
    </View>
  )
}


