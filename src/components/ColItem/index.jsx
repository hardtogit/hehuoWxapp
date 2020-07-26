import Taro, { Component } from "@tarojs/taro";
import classNames from 'classnames'
import {downUrl} from '../../config/index'
import { View, Button, Text } from "@tarojs/components";
import "./index.scss";
export default function Index (props){
  const {col}=props
    return(
        <View className='colItem' onClick={()=>{Taro.navigateTo({url:`/pages/home/storeDetail/index?id=${col.shop_id}`})}}>
            <View className='label'>{col.shop_name} | {col.business_time}</View>
            <Image className='start' src={require('../../assets/img/me/start.png')}></Image>
            <Image className='cover' src={downUrl+col.home_fid}></Image>
            <View className='bottom'>
                <View className='left'>
    <View className='title'>{col.label} | {col.shop_name}</View>
                    <View className='detail'>
                    {col.address}
                    </View>

                </View>
                <View className='right'>
                    <View className='price'>
                        {col.min_price}
                    </View>
                     起
                </View>
            </View>
            </View>
    )
}
