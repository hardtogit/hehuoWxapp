import Taro, { Component, useEffect, useState, useRouter } from "@tarojs/taro";
import classNames from 'classnames'
import dayjs from 'dayjs'
import network from '@/utils/network'
import { getTimeArr } from '@/utils/index'
import { View, Button, Text, WebView, Image, Swiper, SwiperItem } from "@tarojs/components";
import "./index.scss";

const weekMap = {
  0: '星期日',
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六',

}
// {"service_time":{"begin_time":"1599233400","end_time":"1599233400"}}
export default function Index(props) {
  const continueOrder = Taro.getStorageSync('continueOrder')
  console.log(continueOrder, 'sssss')
  const [timeScope, setTimeScope] = useState([continueOrder.service_time.begin_time, continueOrder.service_time.end_time])
  const [canTime, setCanTime] = useState({})
  const [canTimeTwo, setCanTimeTwo] = useState({})
  const [canTimeThree, setCanTimeThree] = useState({})
  const [current, setCurrent] = useState(0)
  const [isTong, setIsTong] = useState(false)
  const [date, setDate] = useState(continueOrder.service_time.end_time)
  const router = useRouter()
  const validateTime = (time2) => {

    const long1 = timeScope[1]
    const long2 = time2
    // console.log(long1,long2,'ss')
    // if(Math.abs(long1-long2)<60*60) {
    //   return {
    //     pass: false,
    //     msg:'一小时起订'
    //   }
    // }
    const flag = canTime.uses_time.some((item) => {
      // const a=dayjs(item[0]*1000).hour()*60+dayjs(item[0]*1000).minute()
      const a = item[0]
      const b = item[1]
      // console.log(a,'dsdsdsdsd')
      if (long2 > long1) {
        return (long1 < a && a < long2) || (long1 < b && b < long2)
      } else {
        return (long2 < a && a < long1) || (long2 < b && b < long1)
      }
    })
    const flag2 = canTimeTwo.uses_time.some((item) => {
      // const a=dayjs(item[0]*1000).hour()*60+dayjs(item[0]*1000).minute()
      const a = item[0]
      // console.log(a,'dsdsdsdsd')
      if (long2 > long1) {
        return (long1 < a && a < long2)
      } else {
        return (long2 < a && a < long1)
      }
    })
    const flag3 = canTimeThree.uses_time.some((item) => {
      // const a=dayjs(item[0]*1000).hour()*60+dayjs(item[0]*1000).minute()
      const a = item[0]
      // console.log(a,'dsdsdsdsd')
      if (long2 > long1) {
        return (long1 < a && a < long2)
      } else {
        return (long2 < a && a < long1)
      }
    })

    if (flag || flag2 || flag3) {
      return {
        pass: false,
        msg: '请选择连续时间段'
      }
    }
    return {
      pass: true
    }
  }
  const timeArr = getTimeArr(canTime.start_time, canTime.end_time)
  const timeArrTwo = getTimeArr(canTimeTwo.start_time, canTimeTwo.end_time)
  const timeArrThree = getTimeArr(canTimeThree.start_time, canTimeThree.end_time)

  const getCanTimes = (time) => {
    return new Promise((resolve, reject) => {
      Taro.showLoading({
        title: '加载中...'
      })
      network.Fetch({
        "obj": "user",
        "act": "list_tea_home_time",
        "shop_id": router.params.shop_id || 'o15956078815923459529',
        "tea_zone_id": router.params.tea_zone_id || 'o15956083697860679626',
        "data": dayjs(dayjs(time * 1000).format('YYYY-MM-DD')).unix()
      }).then((res) => {
        network.Fetch({
          "obj": "user",
          "act": "single_room",
          "room_id": router.params.tea_zone_id || 'o15979078737097969055'
        }).then(data => {
          const arr = data.room.open_time.split('-')
          res.tea_home_time.start_time = arr[0]
          res.tea_home_time.end_time = arr[1]
          Taro.hideLoading({})
          if (dayjs(dayjs(time * 1000).format('YYYY-MM-DD')).unix() == dayjs(dayjs().format('YYYY-MM-DD')).unix()) {
            if ((parseInt(dayjs().format('HH:mm').split(':')[0]) * 60 + parseInt(parseInt(dayjs().format('HH:mm').split(':')[1]))) >
              (parseInt(res.tea_home_time.start_time.split(':')[0]) * 60 + parseInt(parseInt(res.tea_home_time.start_time.split(':')[1])))

            ) {
              resolve({
                ...res.tea_home_time,
                start_time: dayjs().format('HH:mm'),
                // end_time:res.tea_home_time.end_time
              })

            } else {
              resolve(res.tea_home_time)
            }
            // setCanTime()
          } else {
            resolve(res.tea_home_time)
            // setCanTime(res.tea_home_time)
          }
          // setCanTime(res.tea_home_time)
        })
      }).catch(() => {
        Taro.hideLoading({})
        reject()
      })

    })
  }
  const choiceDate = (selectDate) => {
    setTimeScope([])
    setDate(selectDate);
    getCanTime(selectDate)

  }
  // const disabled=(str)=>{
  //   let times= dayjs(dayjs(date*1000).format('YYYY-MM-DD')).unix()+(parseInt(str.split(':')[0])*60+ parseInt(str.split(':')[1]))*60
  //   let flag=false
  //   console.log(canTime.uses_time)
  //   if(canTime.uses_time){
  //     flag=canTime.uses_time.some((item)=>{
  //       console.log(item,times)
  //       return (item[0]-1<times&&times<item[1]+1)
  //     })
  //   }
  //   return flag
  // }
  const isKuaTian = () => {
    return dayjs(continueOrder.service_time.begin_time * 1000).format('YYYY-MM-DD') !== dayjs(continueOrder.service_time.end_time * 1000).format('YYYY-MM-DD')
  }
  const isInner = (time, currentDate) => {
    const currentTime = getCurrentTime(time, currentDate)
    if (timeScope[0] < currentTime && currentTime < timeScope[1] && timeScope.length == 2) {
      return true
    } else if (timeScope[0] < currentTime && currentTime < timeScope[2] && timeScope.length == 3) {
      return true
    } else {
      return false
    }
  }
  const active = (timeStr, num) => {

    const pre = getCurrentTime(timeStr, continueOrder.service_time.end_time + num * 86400)
    return timeScope.indexOf(pre) !== -1
  }
  const disabled = (str, currentDate) => {
    let times = getCurrentTime(str, currentDate)
    let flag = false
    // console.log(canTime.uses_time)
    if (dayjs(currentDate * 1000).format('YYYY-MM-DD') == dayjs(continueOrder.service_time.end_time * 1000).format('YYYY-MM-DD')) {
      if (canTime.uses_time) {
        flag = canTime.uses_time.some((item) => {
          // console.log(item,times)
          return (item[0] - 1 < times && times < item[1] + 1)
        })
      }
    }
    if (dayjs(currentDate * 1000).format('YYYY-MM-DD') == dayjs(continueOrder.service_time.end_time * 1000).add(1, 'd').format('YYYY-MM-DD')) {
      if (canTimeTwo.uses_time) {
        flag = canTimeTwo.uses_time.some((item) => {
          // console.log(item,times)
          return (item[0] - 1 < times && times < item[1] + 1)
        })
      }
    }
    if (dayjs(currentDate * 1000).format('YYYY-MM-DD') == dayjs(continueOrder.service_time.end_time * 1000).add(2, 'd').format('YYYY-MM-DD')) {
      if (canTimeThree.uses_time) {
        flag = canTimeThree.uses_time.some((item) => {
          // console.log(item,times)
          return (item[0] - 1 < times && times < item[1] + 1)
        })
      }
    }
    return flag
  }
  const getCurrentTime = (time, currentDate) => {
    return dayjs(dayjs(currentDate * 1000).format('YYYY-MM-DD')).unix() + (parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1])) * 60
  }
  const submit = () => {
    if (timeScope.length !== 3) {
      Taro.showToast({
        title: '请先选择续订时间',
        icon: 'none'
      })
      return
    }

    Taro.setStorageSync('appointmentTimeScope', { startTime: timeScope[1], endTime: timeScope[2] })
    Taro.navigateBack({})
  }
  const handleDateClick = (currentDate) => {
    setCurrent(currentDate)
  }
  const handleClick = (time, dates) => {
    const selectTime = getCurrentTime(time, dates)
    if (disabled(time, dates)) {
      return
    }

    if (selectTime < timeScope[1]) {
      Taro.showToast({
        title: '请选择订单结束之后的时刻',
        icon: 'none'
      })
      return;
    }
    if (validateTime(selectTime).pass) {
      setTimeScope([timeScope[0], timeScope[1], selectTime])
    } else {
      Taro.showToast({
        title: validateTime(selectTime).msg,
        icon: 'none'
      })
    }


  }
  useEffect(() => {
    getCanTimes(dayjs(continueOrder.service_time.end_time * 1000).unix()).then((times) => { setCanTime(times) });
    getCanTimes(dayjs(continueOrder.service_time.end_time * 1000).add(1, 'd').unix()).then((times) => { setCanTimeTwo(times) });
    getCanTimes(dayjs(continueOrder.service_time.end_time * 1000).add(2, 'd').unix()).then((times) => { if (times.start_time == '00:00' && times.end_time == '23:59') { setIsTong(true) }; setCanTimeThree(times) });
  }, [])
  return (
    <View className='content'>
      <View className='tip'>续订时段以订单结束时刻为开始，重新选定的时刻为结束</View>
      <View className='dates'>
        <View onClick={() => { handleDateClick(0) }} className={classNames(['date', current == 0 && 'active'])} >
          <View className='num'>{dayjs(continueOrder.service_time.end_time * 1000).format('MM月DD日')}</View>
          <View className='week'>{weekMap[dayjs(continueOrder.service_time.end_time * 1000).day()]}</View>
        </View>
        {isTong &&
          <View onClick={() => { handleDateClick(1) }} className={classNames(['date', current == 1 && 'active'])} >
            <View className='num'>{dayjs(continueOrder.service_time.end_time * 1000).add(1, 'd').format('MM月DD日')}</View>
            <View className='week'>{weekMap[dayjs(continueOrder.service_time.end_time * 1000).add(1, 'd').day()]}</View>
          </View>}
        {isTong &&
          <View onClick={() => { handleDateClick(2) }} className={classNames(['date', current == 2 && 'active'])} >
            <View className='num'>{dayjs(continueOrder.service_time.end_time * 1000).add(2, 'd').format('MM月DD日')}</View>
            <View className='week'>{weekMap[dayjs(continueOrder.service_time.end_time * 1000).add(2, 'd').day()]}</View>
          </View>
        }

      </View>
      <Swiper
        autoplay={false}
        current={current}
        className='swiper'
        onChange={(e) => {
          if (canTimeTwo.end_time != '23:59' && canTimeTwo.start_time == '00:00') {
            setTimeScope([])
          }
          setCurrent(e.detail.current)
        }}
      >
        <SwiperItem>
          <View className='time'>
            {timeArr.map((time) => {
              return (
                <View key={time} className={classNames(['item', isInner(time, dayjs(continueOrder.service_time.end_time * 1000).unix()) && 'inner', active(time, 0) && 'active', disabled(time, dayjs(continueOrder.service_time.end_time * 1000).unix()) && 'disabled'])}

                  onClick={() => handleClick(time, dayjs(continueOrder.service_time.end_time * 1000).unix())}
                >
                  {time}
                </View>
              )
            })}
          </View>
        </SwiperItem>
        <SwiperItem>
          <View className='time'>
            {timeArrTwo.map((time) => {
              return (
                <View key={time} className={classNames(['item', isInner(time, dayjs(continueOrder.service_time.end_time * 1000).add(1, 'd').unix()) && 'inner', active(time, 1) && 'active', disabled(time, dayjs(continueOrder.service_time.end_time * 1000).add(1, 'd').unix()) && 'disabled'])}

                  onClick={() => handleClick(time, dayjs(continueOrder.service_time.end_time * 1000).add(1, 'd').unix())}
                >
                  {time}
                </View>
              )
            })}
          </View>
        </SwiperItem>
        <SwiperItem>
          <View className='time'>
            {timeArrThree.map((time) => {
              return (
                <View key={time} className={classNames(['item', isInner(time, dayjs(continueOrder.service_time.end_time * 1000).add(2, 'd').unix()) && 'inner', active(time, 2) && 'active', disabled(time, dayjs(continueOrder.service_time.end_time * 1000).add(2, 'd').unix()) && 'disabled'])}

                  onClick={() => {
                    handleClick(time, dayjs(continueOrder.service_time.end_time * 1000).add(2, 'd').unix())
                  }}
                >
                  {time}
                </View>
              )
            })}
          </View>
        </SwiperItem>
      </Swiper>
      <View className='buttom'>
        <View className='right' onClick={submit}>
          续订{
            timeScope[2] ? `(${(timeScope[2] - timeScope[1]) / 3600}小时)` : ''
          }
        </View>
      </View>
    </View>
  )
}
Index.config = {
  navigationBarTitleText: '选择时间',

}
