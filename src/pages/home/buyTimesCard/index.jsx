import Taro, { Component, useEffect, useState ,useRouter} from "@tarojs/taro";
import { View, Text, Input } from "@tarojs/components";
import TimesCardBuy from '@/components/TimesCardBuy'
import { observer, inject } from '@tarojs/mobx'
import "./index.scss";

const Index = (props) => {
    console.log(props)
    const {shop_id}=useRouter().params
    const timeCards=Taro.getStorageSync('timeCards')
    return (
        <View className='info'>
             {timeCards.map((timeCard)=>{
                  return(
                    <TimesCardBuy timeCard={timeCard} shop_id={shop_id}></TimesCardBuy>
                  )
             })}
            <View className='tip'>*不可与优惠券叠加使用</View>
        </View>
    )
}
Index.config = {
    navigationBarTitleText: '优惠次卡购买',
}


