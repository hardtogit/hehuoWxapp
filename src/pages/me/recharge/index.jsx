import Taro, { Component } from "@tarojs/taro";
import ThemeButton from "@/components/Button"
import { View, Text ,Input} from "@tarojs/components";
import "./index.scss";


const Index = () => {

    return (
        <View className='recharge'>
            <View className='text'>充值金额</View>
            <View className='inputGroup'>
                <View className='unit'>¥</View>    
                <Input className='input' type='number'></Input>
            </View>
            <View className='btn'>
            <ThemeButton text='确认充值'></ThemeButton>
            </View>
        
        </View>
    ) 
}
Index.config = {
    navigationBarTitleText: '充值',
    // navigationBarBackgroundColor: '#00A0E9',
    // navigationBarTextStyle: 'white'
}

 
