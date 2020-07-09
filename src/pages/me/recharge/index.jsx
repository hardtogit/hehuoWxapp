import Taro, { Component,useState} from "@tarojs/taro";
import ThemeButton from "@/components/Button"
import network from '@/utils/network'
import { View, Text ,Input} from "@tarojs/components";
import "./index.scss";


const Index = () => {
    const [value,setValue]=useState('')
    const rechange=(e)=>{
        Taro.showLoading({
          title:'处理中，请稍后...',
          mask:true
        })
        network.Fetch({
          "obj":"user",
          "act":"recharge",
          "payment_amount":value
        }).then((res)=>{
            Taro.hideLoading({})
            Taro.requestPayment({
              ...res.pay_info,
              success:()=>{
                  Taro.showToast({
                    title:'充值成功',
                    icon:'none'
                  })
                  setTimeout(()=>{
                     Taro.navigateBack({})
                  },2000)
              }
            })
        }).catch(()=>{
          Taro.hideLoading({})
        })
    }
    return (
        <View className='recharge'>
            <View className='text'>充值金额</View>
            <View className='inputGroup'>
                <View className='unit'>¥</View>
                <Input className='input' value={value}  onInput={(e)=>{console.log(e);setValue(e.detail.value)}} type='digit'></Input>
            </View>
            <View className='btn'>
            <ThemeButton text='确认充值' onClick={rechange}></ThemeButton>
            </View>
        </View>
    )
}
Index.config = {
    navigationBarTitleText: '充值',
    // navigationBarBackgroundColor: '#00A0E9',
    // navigationBarTextStyle: 'white'
}


