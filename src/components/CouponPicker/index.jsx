import Taro, { Component ,useEffect,useState} from "@tarojs/taro";
import { AtFloatLayout } from 'taro-ui'
import classNames from 'classnames'
import {addZero} from '@/utils/index'
import { View, Button, Text, WebView, Image} from "@tarojs/components";
import "./index.scss";

let timeArr=[]
for(let i=0;i<=1440;i+=30){
  let h=parseInt(i/60)
  let m =i-h*60
  timeArr.push(`${addZero(h)}:${addZero(m)}`)
}

export default (props) => {
  const [timeScope,setTimeScope]= useState([])
  const {onOk, onCancel} =props
  const {visible}=props
  return (
    <AtFloatLayout isOpened={visible} onClick={() => this.setState({ visibleHelp:false})}>
      <View className='content'>

      </View>
  </AtFloatLayout>
  )
}

