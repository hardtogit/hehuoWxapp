import Taro, { Component } from "@tarojs/taro";
import classNames from 'classnames'
import { View, Button, Text } from "@tarojs/components";
import "./index.scss";
export default function Index (){
    return(
        <View className='colItem' onClick={()=>{Taro.navigateTo({url:'/pages/home/storeDetail/index'})}}>
            <View className='label'>合作店铺 | 9:00-18:00</View>
            <Image className='start' src={require('../../assets/img/me/start.png')}></Image>
            <Image className='cover' src={require('../../assets/img/home/home_bg.png')}></Image>
            <View className='bottom'> 
                <View className='left'>
                    <View className='title'>茶空间|智能测试</View>
                    <View className='detail'>
                    上海市接单工业路中央第五街1楼22层22室某某小区... 
                    </View>

                </View>
                <View className='right'>
                    <View className='price'>
                        58
                    </View>
                    起
                </View>
            </View>
            </View>
    )
}