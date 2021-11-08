import Taro, { Component, useEffect, useState, useRouter } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import { AtFloatLayout } from 'taro-ui'
import classNames from 'classnames'
import network from '@/utils/network'
import dayjs from 'dayjs'
import laba from '@/assets/img/home/laba.png'
import TeaArtCard from '../TeaArtCard'

import "./index.scss";



export default (props) => {
  const { onCancel, visible, teaArtList, type } = props
  const [coupons, setCoupons] = useState([])
  const handleOk = () => {
    if (type === 'choice') {

    } else {
      onCancel()
    }
  }
  return (
    <View className='getTeaArt'>
      <AtFloatLayout isOpened={visible} onClose={onCancel}>
        <View className='modal'>
          <View className='header' onClick={onCancel}>
            <View className='left'><Image className='icon' src={laba} />{type === 'choice' ? '点击蓝色为，已被选中跟单' : '本店铺茶艺师列表'} </View>
          </View>
          {
            teaArtList.length === 0 &&
            <View className='empty'>

              <View className='emptyText'>
                暂无茶艺师
              </View>
            </View>
          }
          <ScrollView scrollY={true} className='all'>
            {teaArtList.map((teaArt) => {
              return (
                <TeaArtCard entity={teaArt} key={teaArt._id} />
              )

            })}
          </ScrollView>
          <View className='btns'>
            {
              type === 'choice' &&
              <View className='btn cancel' onClick={onCancel}>
                不用，谢谢
              </View>
            }

            <View className='btn' onClick={handleOk}>
              {type === 'choice' ? '确定' : '返回'}
            </View>
          </View>
        </View>
      </AtFloatLayout>
    </View>
  )
}


