import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import "./index.scss";


const Index = () => {

    return (
        <View className='wallet'>
            <View className='header'>
                <View className='detail'>明细</View>
                <View className='money'>
                    0.00
            </View>
                <View className='total'>总额（元）</View>
            </View>
            <View className='content'> 
                <View className='cell' onClick={()=>{wx.navigateTo({url:',"/pages/me/recharge/index"'})}}>
                    <View className='left'>
                        账户充值
                    </View>
                    <View className='right'>
                        <Image className='icon' src={require('../../../assets/img/me/arrow_right.png')}></Image>
                    </View>
                </View>
                <View className='cell'>
                    <View className='left'>
                        申请发票
                    </View>
                    <View className='right'>
                        <Image className='icon' src={require('../../../assets/img/me/arrow_right.png')}></Image>
                    </View>
                </View>
                <View className='activity'>
                    <View className='item'>
                        <View className='text'>
                            <View>充值满1000</View>
                            <View>送100元</View>
                        </View>
                    </View>
                    <View className='item'>
                        <View className='text'>
                            <View>充值满2000</View>
                            <View>送200元</View>
                        </View>
                    </View>
                    <View className='item'>
                        <View className='text'>
                            <View>充值满3000</View>
                            <View>送300元</View>
                        </View>
                    </View>
                </View>

            </View>

        </View>
    )
}
Index.config = {
    navigationBarTitleText: '我的钱包',
    navigationBarBackgroundColor: '#00A0E9',
    navigationBarTextStyle: 'white'
}


