import Taro, { Component, useEffect, useState, useRouter, useCallback } from "@tarojs/taro";
import classNames from 'classnames'
import dayjs from 'dayjs'
import network from '@/utils/network'
import { getTimeArr } from '@/utils/index'
import { AtFloatLayout, AtIcon } from 'taro-ui'
import laba from '@/assets/img/home/laba.png'
import { View, Button, Text, WebView, Image, Swiper, SwiperItem, ScrollView, Picker } from "@tarojs/components";
import './index.scss'

const weekMap = {
  0: '星期日',
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六',

}

export default (props) => {
  const { onOk, onCancel, visible, shop_id, tea_zone_id, setTimeScopeFn, room } = props
  const [currentStartDate, setCurrentStartDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [timeScope, setTimeScope] = useState([])
  const [current, setCurrent] = useState(0)
  const [canTime, setCanTime] = useState({})
  const [canTimeTwo, setCanTimeTwo] = useState({})
  const [canTimeThree, setCanTimeThree] = useState({})
  const [date, setDate] = useState(dayjs().unix())
  const validateTime = (time2) => {

    const long1 = timeScope[0]
    const long2 = time2
    // console.log(long1,long2,'ss')
    if (Math.abs(long1 - long2) < room.room.price.fromhour * 60 * 60) {
      return {
        pass: false,
        msg: `${room.room.price.fromhour}小时起订`
      }
    }
    const flag = canTime.uses_time.some((item) => {
      // const a=dayjs(item[0]*1000).hour()*60+dayjs(item[0]*1000).minute()
      const a = item[0]
      // console.log(a,'dsdsdsdsd')
      if (long2 > long1) {
        return (long1 < a && a < long2)
      } else {
        return (long2 < a && a < long1)
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
    let flag4 = false//不是24小时营业店铺不能跨天预约
    if ((dayjs(long2 * 1000).format('YYYY-MM-DD') !== dayjs(long1 * 1000).format('YYYY-MM-DD')) && (canTimeTwo.start_time !== '00:00' || canTimeTwo.end_time !== '23:59')) {
      flag4 = true
    }
    if (flag || flag2 || flag3 || flag4) {
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
  // console.log(timeArrTwo,canTimeTwo)

  const getCanTimes = (time) => {
    return new Promise((resolve, reject) => {
      Taro.showLoading({
        title: '加载中...'
      })
      network.Fetch({
        "obj": "user",
        "act": "list_tea_home_time",
        "shop_id": shop_id || 'o15979071007186889648',
        "tea_zone_id": tea_zone_id || 'o15979078737097969055',
        "data": dayjs(dayjs(time * 1000).format('YYYY-MM-DD')).unix()
      }).then((res) => {

        network.Fetch({
          "obj": "user",
          "act": "single_room",
          "room_id": tea_zone_id || 'o15979078737097969055'
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
          // setCanTime(res.tea_home_time)Á

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
    getCanTimes(selectDate)

  }
  const disabled = (str, currentDate) => {
    let times = getCurrentTime(str, currentDate)
    let flag = false
    // console.log(canTime.uses_time)
    if (dayjs(currentDate * 1000).format('YYYY-MM-DD') == dayjs(currentStartDate).format('YYYY-MM-DD')) {
      if (canTime.uses_time) {
        flag = canTime.uses_time.some((item) => {
          // console.log(item,times)
          return (item[0] - 1 < times && times < item[1] + 1)
        })
      }
    }
    if (dayjs(currentDate * 1000).format('YYYY-MM-DD') == dayjs(currentStartDate).add(1, 'd').format('YYYY-MM-DD')) {
      if (canTimeTwo.uses_time) {
        flag = canTimeTwo.uses_time.some((item) => {
          // console.log(item,times)
          return (item[0] - 1 < times && times < item[1] + 1)
        })
      }
    }
    if (dayjs(currentDate * 1000).format('YYYY-MM-DD') == dayjs(currentStartDate).add(2, 'd').format('YYYY-MM-DD')) {
      if (canTimeThree.uses_time) {
        flag = canTimeThree.uses_time.some((item) => {
          // console.log(item,times)
          return (item[0] - 1 < times && times < item[1] + 1)
        })
      }
    }
    return flag
  }
  const active = (time, currentDate) => {

    const currentTime = getCurrentTime(time, currentDate)
    return timeScope.indexOf(currentTime) !== -1
  }

  const inner = (time, currentDate) => {
    const currentTime = getCurrentTime(time, currentDate)
    if (timeScope[0] < currentTime && currentTime < timeScope[1] && timeScope.length == 2) {
      return true
    } else {
      return false
    }
  }
  const submit = () => {
    if (timeScope.length !== 2) {
      Taro.showToast({
        title: '请先选择预约时间',
        icon: 'none'
      })
      return
    }
    setTimeScopeFn({ startTime: timeScope[0], endTime: timeScope[1] })
    // Taro.setStorageSync('appointmentTimeScope',)
    // Taro.navigateBack({})
    onCancel()
  }
  const getCurrentTime = (time, currentDate) => {
    return dayjs(dayjs(currentDate * 1000).format('YYYY-MM-DD')).unix() + (parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1])) * 60


  }
  const handleClick = (time, currentDate) => {
    const currentTime = getCurrentTime(time, currentDate)
    if (disabled(time, currentDate)) {
      return
    }
    if (timeScope.indexOf(currentTime) !== -1) {
      if (timeScope[0] === currentTime) {
        setTimeScope([])
      } else {
        return
        // setTimeScope(timeScope.filter((item)=>item!==currentTime))
      }
    } else {
      if (timeScope.length < 2) {
        if (timeScope.length === 1) {
          if (currentTime > timeScope[0]) {
            if (validateTime(currentTime).pass) {
              setTimeScope([timeScope[0], currentTime])
            } else {
              Taro.showToast({
                title: validateTime(currentTime).msg,
                icon: "none"
              })
              return
            }
          } else {
            setTimeScope([currentTime])
          }
        } else {
          setTimeScope([currentTime])
        }
        // if(timeScope.length===1){
        //   if(validateTime(time).pass){
        //     if(time>timeScope[0]){
        //       setTimeScope([...timeScope,time])
        //     }else{
        //       setTimeScope([time,...timeScope])
        //     }
        //   }else{
        //     Taro.showToast({
        //       title:validateTime(time).msg,
        //       icon:"none"
        //     })
        //     return
        //   }
        // }else{
        //   setTimeScope([time])
        // }
      } else {
        if (currentTime > timeScope[0]) {
          if (validateTime(currentTime).pass) {
            setTimeScope([timeScope[0], currentTime])
          } else {
            Taro.showToast({
              title: validateTime(currentTime).msg,
              icon: "none"
            })
            return
          }
        } else {
          setTimeScope([currentTime])
        }
        // Taro.showToast({
        //   title:'请先点击选择按钮取消所选时间',
        //   icon:'none'
        // })
      }
    }
  }
  const onDateChange = (e) => {
    setCurrentStartDate(e.detail.value)
    getCanTimesArr(e.detail.value)
  }
  const getCanTimesArr = (date) => {
    getCanTimes(dayjs(date).unix()).then((times) => { setCanTime(times) });
    getCanTimes(dayjs(date).add(1, 'd').unix()).then((times) => { setCanTimeTwo(times) });
    getCanTimes(dayjs(date).add(2, 'd').unix()).then((times) => { setCanTimeThree(times) });
  }
  const countTime = useCallback(() => {
    console.log(timeScope, '哈哈哈收到噶咖啡馆')
    // return
    if (timeScope[0] && timeScope[1]) {
      const long = timeScope[1] - timeScope[0]
      return (long / 3600)
    }
    return ''

  }, [timeScope])
  useEffect(() => {
    getCanTimesArr(currentStartDate)
  }, [])

  return (
    <AtFloatLayout isOpened={visible} onClick={() => this.setState({ visibleHelp: false })} onClose={onCancel}>
      <View className='content'>
        <View className='header' onClick={onCancel}>
          <View className='left'><Image className='icon' src={laba} /> {room.room.price.fromhour}小时起订，灰色为已被预订</View>
        </View>
        <View className='main'>
          <View className='dates'>
            <View className={classNames(['date', current == 0 && 'active'])} onClick={() => setCurrent(0)}>
              <View className='num'>{dayjs(currentStartDate).format('MM月DD日')}</View>
              <View className='week'>{weekMap[dayjs(currentStartDate).day()]}</View>
            </View>
            <View className={classNames(['date', current == 1 && 'active'])} onClick={() => setCurrent(1)}>
              <View className='num'>{dayjs(currentStartDate).add(1, 'd').format('MM月DD日')}</View>
              <View className='week'>{weekMap[dayjs(currentStartDate).add(1, 'd').day()]}</View>
            </View>
            <View className={classNames(['date', current == 2 && 'active'])} onClick={() => setCurrent(2)}>
              <View className='num'>{dayjs(currentStartDate).add(2, 'd').format('MM月DD日')}</View>
              <View className='week'> {weekMap[dayjs(currentStartDate).add(2, 'd').day()]}</View>
            </View>
            {/* <View className='date'  > */}
              <Picker mode="date" className='date' start={dayjs().format('YYYY-MM-DD')} end={dayjs().add(30,'d').format('YYYY-MM-DD')} onChange={onDateChange}>
                <AtIcon className='at-icon at-icon-calendar'></AtIcon>
                <View className='num'>其他日期</View>
              </Picker>

            {/* </View> */}
            {/* <View className='date'>
        <View className='week'>其他日期</View>
      </View> */}
          </View>
          {/* <ScrollView className='times' scrollY> */}
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
              <ScrollView className='timesItem' scrollY>
                <View className='time'>
                  {timeArr.map((time) => {
                    return (
                      <View key={time} className={classNames(['item', inner(time, dayjs(currentStartDate).unix()) && 'inner', active(time, dayjs(currentStartDate).unix()) && 'active', disabled(time, dayjs(currentStartDate).unix()) && 'disabled'])}

                        onClick={() => handleClick(time, dayjs(currentStartDate).unix())}
                      >
                        {time}
                      </View>
                    )
                  })}
                </View>
              </ScrollView>
            </SwiperItem>
            <SwiperItem>
              <ScrollView className='timesItem' scrollY>
                <View className='time'>
                  {timeArrTwo.map((time) => {
                    return (
                      <View key={time} className={classNames(['item', inner(time, dayjs(currentStartDate).add(1, 'd').unix()) && 'inner', active(time, dayjs(currentStartDate).add(1, 'd').unix()) && 'active', disabled(time, dayjs(currentStartDate).add(1, 'd').unix()) && 'disabled'])}

                        onClick={() => handleClick(time, dayjs(currentStartDate).add(1, 'd').unix())}
                      >
                        {time}
                      </View>
                    )
                  })}
                </View>
              </ScrollView>
            </SwiperItem>
            <SwiperItem>
              <ScrollView className='timesItem' scrollY>
                <View className='time'>
                  {timeArrThree.map((time) => {
                    return (
                      <View key={time} className={classNames(['item', inner(time, dayjs(currentStartDate).add(2, 'd').unix()) && 'inner', active(time, dayjs(currentStartDate).add(2, 'd').unix()) && 'active', disabled(time, dayjs(currentStartDate).add(2, 'd').unix()) && 'disabled'])}

                        onClick={() => {
                          handleClick(time, dayjs(currentStartDate).add(2, 'd').unix())
                        }}
                      >
                        {time}
                      </View>
                    )
                  })}
                </View>
              </ScrollView>
            </SwiperItem>
          </Swiper>
          {/* </ScrollView> */}
        </View>
        <View className='buttom'>
          <View className='left' onClick={onCancel}>
            取消
          </View>
          <View className='right' onClick={submit}>
            确定{countTime() ? `(${countTime()}小时)` : ''}
          </View>
        </View>
      </View>
    </AtFloatLayout>
  )
}

