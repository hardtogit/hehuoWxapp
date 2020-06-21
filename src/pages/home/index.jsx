import Taro, { Component, useState, useEffect, createRef,useDidShow } from "@tarojs/taro";
import { View, Button, Text, Image, Swiper, SwiperItem } from "@tarojs/components";
import { AtFloatLayout } from 'taro-ui'
import classNames from 'classnames'
import TeaCard from '@/components/TeaCard'
import network from '@/utils/network'
import { downUrl } from '../../config'
import ListTemplate from '@/components/ListTemplate'
import "./index.scss";

export default function Index() {
  const listRef=createRef()
  const [visibleHelp, setVisibleHelp] = useState(false)
  const [typeId,setTypeId]=useState()
  const [banner, setBanner] = useState([])
  const [type, setType] = useState([])
  useDidShow(() => {
    network.Fetch({
      "obj": "user",
      "act": "list_advertising"
    }).then((data) => {
      setBanner(data.list)
    })
    network.Fetch({
      "obj": "user",
      "act": "list_category"
    }).then((ressult) => {
      setType(ressult.list)
      console.log(ressult.list)
      setTypeId(ressult.list[0]._id) 
      setTimeout(()=>{
        listRef.current.initLoad()
      },0)
    })
  })
  // useEffect(()=>{
  //   console.log(listRef)
  //   console.log(typeId)
  //   if(typeId){
  //     console.log(listRef)
  //     listRef.current.initLoad()
  //   }
  // },[typeId])
  return (
    <View>
      <View className='header'>
        <View className='toolbar'>
          <View className='left'>
            <Image className='location' src={require('../../assets/img/home/location_one.png')}></Image>
            <Text className='text'>上海市晋安区</Text>
            <Image className='arrow_down' src={require('../../assets/img/home/arrow_down.png')}></Image>
          </View>
          <View className='right'>
            <View className='cooperation'>
              <Image className='icon' src={require('../../assets/img/home/cooperation.png')}></Image>
              <Text className='label'>加盟合作</Text>
            </View>

            <View className='store'>
              <Image className='icon' src={require('../../assets/img/home/store.png')}></Image>
              <Text className='label'>积分商城</Text>
            </View>
          </View>
        </View>
        <View className='swiper_container'>
          <Swiper
            className='swiper'
            indicatorColor='#999'
            indicatorActiveColor='#333'
            circular
            indicatorDots
            autoplay
          >
            {banner.map((item) => {
              return (
                <SwiperItem>
                  <Image className='slide' src={downUrl + item.adv_cover}></Image>
                </SwiperItem>
              )
            })}

          </Swiper>
        </View>
        <View className='functions'>
          <View className='function'>
            <Image className='icon' src={require('../../assets/img/home/fn_one.png')}></Image>
            <Text className='text'>
              我来续单
       </Text>
          </View>
          <View className='function' onClick={() => Taro.navigateTo({ url: '/pages/home/codeList/index' })}>
            <Image className='icon' src={require('../../assets/img/home/fn_two.png')}></Image>
            <Text className='text'>
              开门码
       </Text>
          </View>
          <View className='function' onClick={() => setVisibleHelp(true)}>
            <Image className='icon' src={require('../../assets/img/home/fn_three.png')}></Image>
            <Text className='text'>
              有事找我
       </Text>
          </View>
          <View className='function' onClick={() => { Taro.navigateTo({ url: '/pages/home/map/index' }) }}>
            <Image className='icon' src={require('../../assets/img/home/fn_four.png')}></Image>
            <Text className='text'>
              地图找店
       </Text>
          </View>
        </View>
      </View>
      <View className='body'>
        <View className='tabs'>
          {type.map((item) => (
            <View className={classNames(['tab',item._id==typeId&&'active'])}>
              {item.category_name}
            </View>
          ))}

        </View>
        <ListTemplate ref={listRef} preLoad={false} renderItem={(res) => {
          console.log(res,'ssssssssss')
          // return ( 
          //    <View>dasdasda</View>
         
          // )
        }} 
        fetchFn={(params) =>
          network.Fetch({
            ...params,
            obj: "user",
            act: "list_shops",
            category_id: typeId
          })  
        }>
        </ListTemplate>
      </View>

      <AtFloatLayout isOpened={visibleHelp} onClose={() => { setVisibleHelp(false) }}>
        <View className='title'>服务中心</View>
        <View className='funs'>
          <View className='fun '>
            <Image className='icon' src={require("../../assets/img/home/help1.png")}></Image>
            <Text className='text'>联系我们</Text>
          </View>
          <View className='fun'>
            <Image className='icon two' src={require("../../assets/img/home/help2.png")}></Image>
            <Text className='text'>关于我们</Text>
          </View>
          <View className='fun '>
            <Image className='icon three' src={require("../../assets/img/home/help3.png")}></Image>
            <Text className='text'> 常见问题</Text>
          </View>
        </View>
        <View className='btn' onClick={() => setVisibleHelp(false)}>
          取消
      </View>
      </AtFloatLayout>
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '首页',
  navigationBarBackgroundColor: '#00A0E9',
  navigationBarTextStyle: 'white'
}


