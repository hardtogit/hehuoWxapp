import Taro, { Component ,useEffect,useState,useRouter} from "@tarojs/taro";
import classNames from 'classnames'
import dayjs from 'dayjs'
import network from '@/utils/network'
import {getTimeArr} from '@/utils/index'
import { View, Button, Text, WebView, Image} from "@tarojs/components";
import "./index.scss";

const weekMap={
  0:'星期日',
  1:'星期一',
  2:'星期二',
  3:'星期三',
  4:'星期四',
  5:'星期五',
  6:'星期六',

}

export default function Index(props){
  const [timeScope,setTimeScope]= useState([])
  const [canTime, setCanTime]=useState({})
  const [date,setDate]=useState(dayjs().unix())
  const router=useRouter()
  const validateTime=(time2)=>{
      const time1=timeScope[0]
      const long1= parseInt(time1.split(':')[0])*60+ parseInt(time1.split(':')[1])
      const long2= parseInt(time2.split(':')[0])*60+ parseInt(time2.split(':')[1])
      return Math.abs(long1-long2)>=60
  }
  const timeArr=getTimeArr(canTime.start_time,canTime.end_time)
  const getCanTime=()=>{
    Taro.showLoading({
      title:'加载中...'
    })
    network.Fetch({
      "obj":"user",
      "act":"list_tea_home_time",
      "shops_id": router.params.shops_id||'o15941436832437150478',
      "tea_zone_id": router.params.tea_zone_id||'o15942139490885128974',
      "data":date
    }).then((res)=>{
        Taro.hideLoading({})
        setCanTime(res.tea_home_time)
    }).catch(()=>{
      Taro.hideLoading({})
    })
  }
  const choiceDate=(selectDate)=>{
      setDate(selectDate);
      setTimeout(()=>{
        getCanTime()
      },500)
  }
  const submit=()=>{
      if(timeScope.length!==2){
        Taro.showToast({
          title:'请先选择预约时间',
          icon:'none'
        })
        return
      }
      const preDate= dayjs(dayjs(date*1000).format('YYYY-MM-DD')).unix()
      let startTime=preDate+(parseInt(timeScope[0].split(':')[0])*60+ parseInt(timeScope[0].split(':')[1]))* 60

      let endTime=preDate+(parseInt(timeScope[1].split(':')[0])*60+ parseInt(timeScope[1].split(':')[1]))* 60
      if(startTime>endTime){
        let sum=startTime;
        startTime=endTime;
        endTime=sum
      }
      Taro.setStorageSync('appointmentTimeScope',{startTime,endTime})
      Taro.navigateBack({})
  }
  useEffect(()=>{
    getCanTime()
  },[])
  return (

      <View className='content'>
    <View className='tip'>1小时起订，灰色为已被预订。预约成功后，可提前15分钟入场</View>
    <View className='dates'>
      <View className={classNames(['date',dayjs(date*1000).format('YYYY-MM-DD')==dayjs().format('YYYY-MM-DD')&&'active'])} onClick={()=>choiceDate(dayjs().unix())}>
      <View className='num'>{dayjs().format('MM月DD日')}</View>
      <View className='week'>{weekMap[dayjs().day()]}</View>
      </View>
      <View className={classNames(['date',dayjs(date*1000).format('YYYY-MM-DD')==dayjs().add(1,'d').format('YYYY-MM-DD')&&'active'])}  onClick={()=>choiceDate(dayjs().add(1,'d').unix())}>
        <View className='num'>{dayjs().add(1,'d').format('MM月DD日')}</View>
        <View className='week'>{weekMap[dayjs().add(1,'d').day()]}</View>
      </View>
      <View className={classNames(['date',dayjs(date*1000).format('YYYY-MM-DD')==dayjs().add(2,'d').format('YYYY-MM-DD')&&'active'])}  onClick={()=>choiceDate(dayjs().add(2,'d').unix())}>
        <View className='num'>{dayjs().add(2,'d').format('MM月DD日')}</View>
        <View className='week'> {weekMap[dayjs().add(2,'d').day()]}</View>
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
        <View className='right' onClick={submit}>
          预约
        </View>
      </View>
    </View>
  )
}


Index.config = {
  navigationBarTitleText: '选择时间',

}
