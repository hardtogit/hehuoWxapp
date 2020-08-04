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
      if(Math.abs(long1-long2)<60) {
        return {
          pass: false,
          msg:'一小时起订'
        }
      }
    const flag=canTime.uses_time.some((item)=>{
      const a=dayjs(item[0]*1000).hour()*60+dayjs(item[0]*1000).minute()
      // console.log(a,'dsdsdsdsd')
      if(long2>long1){
        return ( long1<a&&a<long2)
      }else{
        return  ( long2<a&&a<long1*60)
      }

    })
    if(flag){
      return {
        pass: false,
        msg:'请选择连续时间段'
      }
    }
     return {
      pass: true
     }
  }
  const timeArr=getTimeArr(canTime.start_time,canTime.end_time)
  const getCanTime=(time)=>{
    Taro.showLoading({
      title:'加载中...'
    })
    network.Fetch({
      "obj":"user",
      "act":"list_tea_home_time",
      "shop_id": router.params.shop_id||'o15956078815923459529',
      "tea_zone_id": router.params.tea_zone_id||'o15956083697860679626',
      "data": dayjs(dayjs(time*1000).format('YYYY-MM-DD')).unix()
    }).then((res)=>{
        Taro.hideLoading({})
        if(dayjs(dayjs(time*1000).format('YYYY-MM-DD')).unix()==dayjs(dayjs().format('YYYY-MM-DD')).unix()){
            setCanTime({
                ...res.tea_home_time,
                start_time:dayjs().format('HH:mm'),
                // end_time:res.tea_home_time.end_time
            })
        }else{
          setCanTime(res.tea_home_time)
        }
        // setCanTime(res.tea_home_time)
    }).catch(()=>{
      Taro.hideLoading({})
    })
  }
  const choiceDate=(selectDate)=>{
      setTimeScope([])
      setDate(selectDate);
        getCanTime(selectDate)

  }
  const disabled=(str)=>{
    let times= dayjs(dayjs(date*1000).format('YYYY-MM-DD')).unix()+(parseInt(str.split(':')[0])*60+ parseInt(str.split(':')[1]))*60
    let flag=false
    // console.log(canTime.uses_time)
    if(canTime.uses_time){
      flag=canTime.uses_time.some((item)=>{
        // console.log(item,times)
        return (item[0]-1<times&&times<item[1]+1)
      })
    }
    return flag
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
    getCanTime(date)
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
      {/* <View className='date'>
        <View className='week'>其他日期</View>
      </View> */}
    </View>
    <View className='time'>
      {timeArr.map((time)=>{
            return (
              <View className={classNames(['item',(timeScope.length===2&&timeScope[0]<time&&time<timeScope[1])&&'inner', timeScope.indexOf(time)!==-1&&'active',disabled(time)&&'disabled'])}
                    onTouchStart={()=>{
                      console.log('aaaa')
                    }}

                    onClick={()=>{
                if(disabled(time)){
                  return
                }
                if(timeScope.indexOf(time)!==-1){
                    setTimeScope(timeScope.filter((item)=>item!==time))
                }else{
                  if(timeScope.length<2){
                    if(timeScope.length===1){
                      if(validateTime(time).pass){
                        if(time>timeScope[0]){
                          setTimeScope([...timeScope,time])
                        }else{
                          setTimeScope([time,...timeScope])
                        }
                      }else{
                        Taro.showToast({
                          title:validateTime(time).msg,
                          icon:"none"
                        })
                        return
                      }
                    }else{
                      setTimeScope([time])
                    }
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
