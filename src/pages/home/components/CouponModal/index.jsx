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
            <Image className='img' onLoad={()=>{setVisible(true)}}  src={`${downUrl}${entity.popup_cover}`} mode={'widthFix'} onClick={()=>{
              if(entity.popup_jump_link){
                  onCancel()
                  Taro.navigateTo({url:entity.popup_jump_link})
              }
            }} >
            </Image>
            <Image onClick={onCancel} className='close' src={require('../../../../assets/img/home/closes.png')}></Image>
          </View>
        </View>
    </View>
  )
}
Index.config = {
  navigationBarTitleText: '登陆'
}


