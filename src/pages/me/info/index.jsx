import Taro, { Component, useEffect, useState } from "@tarojs/taro";
import ThemeButton from "@/components/Button"
import { View, Text, Input } from "@tarojs/components";
import { downUrl } from '../../../config'
import network from '@/utils/network'
import { AtList, AtListItem } from "taro-ui"
import { observer, inject } from '@tarojs/mobx'
import "./index.scss";


const Index = (props) => {
    console.log(props)
    const entity=Taro.getStorageSync('userInfo')
    console.log(entity)  
    return ( 
        <View className='info'>
             <View className='cell' >
                    <View className='left'>
                        头像
                    </View>
                    <View className='right'>

                        <Image className='cover' src={entity.avatar_fid}></Image>
                    </View>
                </View>
                <View className='cell' >
                    <View className='left'>
                        昵称
                    </View>
                    <View className='right'>
                        {entity.nickname}
                    </View>
                </View>
                <View className='cell' onClick={()=>{Taro.navigateTo({url:"/pages/me/bindPhone/index"})}}>
                    <View className='left'>
                        手机号 
                    </View>
                    <View className='right'>
                        {entity.phone||'去绑定'}
                        <Image className='icon' src={require('../../../assets/img/me/arrow_right.png')}></Image>
                    </View>
                </View>
                <View className='cell'>
                    <View className='left'>
                        微信
                    </View>
                    <View className='right'>
                        已绑定
                    </View>
                </View>
    

        </View>
    )
}
export default inject("counterStore")(observer(Index));
Index.config = {
    navigationBarTitleText: '个人信息',
    // navigationBarBackgroundColor: '#00A0E9',
    // navigationBarTextStyle: 'white'
}


