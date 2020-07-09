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
  const validateTime=(time2)=>{
      const time1=timeScope[0]
      const long1= parseInt(time1.split(':')[0])*60+ parseInt(time1.split(':')[1])
      const long2= parseInt(time2.split(':')[0])*60+ parseInt(time2.split(':')[1])
      return Math.abs(long1-long2)>=60
  }
  const {visible}=props
  return (
    <AtFloatLayout isOpened={visible} onClick={() => this.setState({ visibleHelp:false})}>
      <View className='content'>
    <View className='title'>服务中心</View>
    <View className='tip'>1小时起订，灰色为已被预订。预约成功后，可提前15分钟入场</View>
    <View className='dates'>
      <View className='date'>
        <View className='num'>5月1日</View>
        <View className='week'>星期五</View>
      </View>
      <View className='date'>
        <View className='num'>5月1日</View>
        <View className='week'>星期五</View>
      </View>
      <View className='date'>
        <View className='num'>5月1日</View>
        <View className='week'> 星期五</View>
      </View>
      <View className='date'>
        <View className='week'>其他日期</View>
      </View>
    </View>
    <View className='time'>
      {timeArr.map((time)=>{
            return (
              <View className={classNames(['item',timeScope.indexOf(time)!==-1&&'active'])} onClick={()=>{
                if(timeScope.indexOf(time)!==-1){
                    setTimeScope(timeScope.filter((item)=>item!==time))
                }else{
                  if(timeScope.length<2){
                    if(timeScope.length===1){
                      if(validateTime(time)){
                        setTimeScope([...timeScope,time])
                      }else{
                        Taro.showToast({
                          title:'1小时起定',
                          icon:'none'
                        })
                        return
                      }

                    }
                    setTimeScope([...timeScope,time])
                  }else{
                    Taro.showToast({
                      title:'请先点击选择按钮取消所选时间',
                      icon:'none'
                    })
                  }
                }
              }}
              >
                {time}
              </View>
            )
      })}
      </View>
      <View className='buttom'>
        <View className='left' onClick={onCancel}>
          取消
        </View>
        <View className='right'>
          预约
        </View>
      </View>
    </View>
  </AtFloatLayout>
  )
}

