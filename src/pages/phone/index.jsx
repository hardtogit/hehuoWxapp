import Taro, { Component ,useEffect} from "@tarojs/taro";
import { View, Button, Text, WebView, Image} from "@tarojs/components";
import network from '../../utils/network'
import "./index.scss";


const Index = () => {

  // useEffect(()=>{
  //   wx.login({
  //     success(res){
  //       console.log(res)
  //     }
  //   })
  // },[])
  const handleGetUserInfo=(e)=>{
    console.log(e)
     if(e.detail.iv){
      network.Fetch({
        "obj":"user",
        "act":"set_personal",
        type:1,
        ...e.detail
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

    }
  return (
    <View className='me'>
      <Image className='logo' src={require('../../assets/img/me/logo.png')}></Image>
      <Button className='btn' openType='getPhoneNumber' onGetPhoneNumber={handleGetUserInfo}>绑定手机号</Button>
    </View>
  )
}
Index.config = {
  navigationBarTitleText: '绑定手机号'
}


