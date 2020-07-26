import Taro, { Component, useDidShow, useState } from "@tarojs/taro";
import ThemeButton from "@/components/Button"
import { View, Text, Input } from "@tarojs/components";
import { downUrl } from '../../../config'
import network from '@/utils/network'
import { AtInput, AtForm } from "taro-ui"
import "./index.scss";


const Index = () => {
    const [value, setValue] = useState('')
    const [entity, setEntity] = useState({})
    useDidShow(() => {
        network.Fetch({
            "obj": "user",
            "act": "get_personal"
        }).then((data) => {
            if(data.personal.phone){
                setValue(data.personal.phone)
            }
        })

    }, [])
    const submit=()=>{
        console.log(value)
        if(value.length!==11){
            Taro.showToast({
                title:'请填写正确的手机号',
                icon:'none'
            })
            return
        }
        network.Fetch({
            "obj":"user",
            "act":"set_personal",
            "phone":value,
            type:2
        }).then((data) => {
            Taro.showToast({
                title:'绑定成功',
                icon:'success',
                duration: 2000
            })
            setTimeout(()=>{
                Taro.navigateBack({})
            },2000)
        })


    }
    return (
        <View>
        <AtForm>
            <AtInput
                name='phone'
                title='手机号'
                type='number'
                placeholder='请填写新的手机号'
                value={value}
                onChange={(e) =>{setValue(e)}}
            />
        </AtForm>
        <View className='btn' onClick={submit}>
            保存
        </View>
        </View>
    )
}
Index.config = {
    navigationBarTitleText: '个人信息',
    // navigationBarBackgroundColor: '#00A0E9',
    // navigationBarTextStyle: 'white'
}


