import Taro, { Component ,useEffect,useState} from "@tarojs/taro";
import { View, Button, Text, WebView, Image} from "@tarojs/components";
import classNames from 'classnames'
import {downUrl} from '../../../../config'
import network from '../../utils/network'
import "./index.scss";


const Index = (props) => {
  const {onCancel,entity}=props
  const [visible,setVisible]=useState(false)
  return (
    <View className={classNames(['modal',visible&&'visible'])}>
       <View className='mask'>
       </View>
        <View className='content'>
          <View className='inner'>
            <Image className='img' onLoad={()=>{setVisible(true)}}  src={`${downUrl}${entity.popup_cover}`} mode='widthFix' onClick={()=>{
                    if(entity.popup_type==='优惠券'){
                      onCancel()
                      Taro.navigateTo({url:'/pages/me/coupon/index'})
                      return
                    }
                 if(entity.popup_type==='详情'){
                    Taro.setStorageSync('richText',entity.popup_jump_info)
                    Taro.navigateTo({url:`/pages/home/text/index`})
                  }else if(entity.popup_type==='链接'){
                    if(entity.popup_jump_link.startsWith('http')){
                      Taro.navigateTo({url:`/pages/home/web/index?url=${entity.popup_jump_link}`})
                    }else{
                      Taro.navigateTo({url:entity.popup_jump_link})
                    }
                  }
            }}
            >
            </Image>
            <Image onClick={onCancel} className='close' src={require('../../../../assets/img/home/close2.png')}></Image>
          </View>
        </View>
    </View>
  )
}
Index.config = {
  navigationBarTitleText: '登陆'
}


