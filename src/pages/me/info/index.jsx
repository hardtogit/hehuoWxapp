import Taro, { Component, useEffect, useState } from "@tarojs/taro";
import ThemeButton from "@/components/Button"
import { View, Text, Input } from "@tarojs/components";
import { downUrl } from '../../../config'
import network from '@/utils/network'
import { AtList, AtListItem } from "taro-ui"
import "./index.scss";


const Index = () => {
    const [entity, setEntity] = useState({})
    useEffect(() => {
        network.Fetch({
            "obj":"user",
            "act":"get_personal"
        }).then((data) => {
            setEntity(data.personal)

        })


    }, [])
    return (
        <View className='info'>
             <View className='cell' onClick={()=>{wx.navigateTo({url:',"/pages/me/recharge/index"'})}}>
                    <View className='left'>
                        头像
                    </View>
                    <View className='right'>

                        <Image className='cover' src={entity.avatar_fid}></Image>
                    </View>
                </View>
                <View className='cell' onClick={()=>{wx.navigateTo({url:',"/pages/me/recharge/index"'})}}>
                    <View className='left'>
                        昵称
                    </View>
                    <View className='right'>
                        {entity.nickname}
                    </View>
                </View>
                <View className='cell' onClick={()=>{wx.navigateTo({url:',"/pages/me/recharge/index"'})}}>
                    <View className='left'>
                        手机号
                    </View>
                    <View className='right'>
                        {entity.phone}
                        <Image className='icon' src={require('../../../assets/img/me/arrow_right.png')}></Image>
                    </View>
                </View>
                <View className='cell' onClick={()=>{wx.navigateTo({url:',"/pages/me/recharge/index"'})}}>
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
Index.config = {
    navigationBarTitleText: '个人信息',
    // navigationBarBackgroundColor: '#00A0E9',
    // navigationBarTextStyle: 'white'
}


