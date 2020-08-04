import Taro, { Component, useState, useEffect, createRef,useDidShow } from "@tarojs/taro";
import { View, Button, Text, Image, Swiper, SwiperItem } from "@tarojs/components";
import { AtFloatLayout } from 'taro-ui'
import classNames from 'classnames'
import {inject,observer} from '@tarojs/mobx'
import TeaCard from '@/components/TeaCard'
import network from '@/utils/network'
import QQMapWX from '../../assets/js/qqmap-wx-jssdk.min.js'
import CouponModal from './components/CouponModal'
import { downUrl } from '../../config'

import ListTemplate from '@/components/ListTemplate'
import "./index.scss";

@inject('listDataStore')
@observer
class Index extends Component{
  constructor(props){
    super(props)
    this.state={
      visibleHelp:false,
      visibleCoupon:false,
      visibleClassfly:false,
      typeId:null,
      banner:[],
      type:[],
      location:'定位中...',
      locations:'',
      phone:''
    }
  }
  componentDidMount(){
    const $this=this
    const  qqmapsdk = new QQMapWX({
      key: 'CS7BZ-V2ZWQ-Q7455-G3YYK-5VSCZ-T4BQU'
    });

      network.Fetch({
        "obj": "user",
        "act": "contact_us"
      }).then((a) => {
          this.setState(
            {
              phone:a.platform_phone
            })
      })

    network.Fetch({
      "obj": "user",
      "act": "list_advertising"
    }).then((data) => {
      this.setState({
        banner:data.list
      })
    })
    network.Fetch({
      "obj": "user",
      "act": "list_category"
    }).then((result) => {
      qqmapsdk.reverseGeocoder({
        success:function(results){
              console.log(results)
              $this.setState({
                location:results.result.address_component.city+results.result.address_component.district
              })
              $this.setState({
                type:result.list,
                typeId:result.list[0]._id,
                locations:results.result.location
              },()=>{
                $this.listRef.initLoad()
              })
              Taro.setStorageSync('myLocation',results.result.location)
          }
        })



    })
  }
  onReachBottom(){
    this.listRef.getData()
  }
  onShareAppMessage(options){
      return {
        title:'精龟叙',
        path:'/pages/home/index',
      }
  }

  render(){
    const {  visibleHelp,
      visibleCoupon,
      visibleClassfly,
      typeId,
      banner,
      location,
      locations,
      phone,
      type}=this.state
      const {teaList}=this.props.listDataStore
    return (
      <View className='home'>
        <View className='header'>
          <View className='toolbar'>
            <View className='left'>
              <Image className='location' src={require('../../assets/img/home/location_one.png')}></Image>
              <Text className='text'>{location}</Text>
              <Image className='arrow_down' src={require('../../assets/img/home/arrow_down.png')}></Image>
            </View>
            <View className='right'>
              <View className='cooperation' onClick={()=>Taro.navigateTo({url:'/pages/me/apply/index'})}>
                <Image className='icon' src={require('../../assets/img/home/cooperation.png')}></Image>
                <Text className='label'>加盟合作</Text>
              </View>

              <View className='store' onClick={()=>{
                Taro.showModal({
                  title:'温馨提示',
                  content:'正在开发中，请耐心等待',

                })
              }}>
                <Image className='icon' src={require('../../assets/img/home/store.png')}></Image>
                <Text className='label'>优选商城</Text>
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
          <View className='functions' >
            <View className='function' onClick={()=>Taro.navigateTo({url:'/pages/home/continueList/index'})}>
              <Image className='icon' src={require('../../assets/img/home/fn_one.png')}></Image>
              <Text className='text'>
                我要续单
            </Text>
            </View>
            <View className='function' onClick={() => Taro.navigateTo({ url: '/pages/home/codeList/index' })}>
              <Image className='icon' src={require('../../assets/img/home/fn_two.png')}></Image>
              <Text className='text'>
                开门码
              </Text>
            </View>
            <View className='function' onClick={() => this.setState({ visibleHelp:true})}>
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
            {type.map((item,i) => {
              if(i<4){
                return(
                  <View className={classNames(['tab',item._id==typeId&&'active'])} onClick={()=>{this.setState({typeId:item._id},()=>{
                    this.listRef.initLoad()
              })}}>
                {item.category_name}
                <View className='bar'></View>
              </View>
              )
              }
            })}
            {type.length>4&&
            <View className='more' onClick={()=>{
              this.setState({
                visibleClassfly:true
              })
            }}>
              更多<Image className='icon' src={require('../../assets/img/me/arrow_right.png')}></Image>
            </View>
            }
          </View>
          <ListTemplate ref={(listRef)=>{this.listRef=listRef}} preLoad={false}
            listDataKey='teaList'
            fetchFn={(params) =>
            network.Fetch({
              ...params,
              obj: "user",
              act: "list_shops",
              category_id: typeId,
              latitude:locations.lat,
              longitude:locations.lng
            })
          }
          >
          {teaList.map((tea)=>{
            return(
              <View className='teaContainer'>
              <TeaCard tea={tea} key={tea._id} />
              </View>
            )
            })
            }
          </ListTemplate>
        </View>
        <View className='normal'>
          <AtFloatLayout isOpened={visibleHelp} onClose={() => this.setState({ visibleHelp:false})}>
            <View className='title'>服务中心</View>
            <View className='funs'>
              <View className='fun' onClick={()=>{Taro.makePhoneCall({phoneNumber:phone})}}>
                <Image className='icon' src={require("../../assets/img/home/help1.png")}></Image>
                <Text className='text'>联系我们</Text>
              </View>
              <View className='fun' onClick={()=>Taro.navigateTo({url:'/pages/me/about/index'})}>
                <Image className='icon two' src={require("../../assets/img/home/help2.png")}></Image>
                <Text className='text'>关于我们</Text>
              </View>
              <View className='fun ' onClick={()=>Taro.navigateTo({url:'/pages/me/problem/index'})}>
                <Image className='icon three' src={require("../../assets/img/home/help3.png")}></Image>
                <Text className='text'> 常见问题</Text>
              </View>
            </View>
          </AtFloatLayout>
        </View>
        <View className='teshu'>
          <AtFloatLayout isOpened={visibleClassfly} onClose={() => this.setState({ visibleClassfly:false})}>
            <View className='head'>
              <View className="text">全部服务</View>
              <Image className='icon' onClick={()=>this.setState({
                visibleClassfly:false
              })} src={require('../../assets/img/close.png')}></Image>
            </View>
            <View className='funs'>
              {type.map((item,i) => {
                return(<View className='pfun'
                             onClick={()=>{this.setState({typeId:item._id,visibleClassfly:false},()=>{
                               this.listRef.initLoad()
                             })}}
                  >
                    <Image className='icon' src={downUrl+item.category_fid}></Image>
                    <Text className='text'>{item.category_name}</Text>
                  </View>
                )
              })}
            </View>
          </AtFloatLayout>
        </View>
          {visibleCoupon&&
          <CouponModal></CouponModal>
          }
      </View>
    )
  }
}




Index.config = {
  navigationBarTitleText: '首页',
  navigationBarBackgroundColor: '#00A0E9',
  navigationBarTextStyle: 'white'
}


