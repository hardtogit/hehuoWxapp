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
    const userInfo=e.detail.userInfo;
    if(userInfo){
         Taro.login({
           success:(res)=>{
             console.log(res)
            network.Fetch({
               obj:'loginInfo',
               act:'get',
               code:res.code 
            }).then((data)=>{
                console.log(data)
                network.Fetch({
                  xtype:'user',
                  openid:data.response.openid,
                  access_token:data.response.session_key,
                  nickname:userInfo.nickName,
                  sex:userInfo.gender,
                  avatar_fid:userInfo.avatarUrl
                }).then((result)=>{
                    console.log(result)
                    Taro.setStorageSync('userInfo', result.user_info)
                    Taro.setStorageSync('sess',result.sess)
                    Taro.navigateBack({})
                }) 
          
            })

           }
         }) 
    }
  }
  return (
    <View className='me'>
      <Button openType='getUserInfo' onGetUserInfo={handleGetUserInfo}>授权登陆</Button> 
    </View>
  )
}
Index.config = {
  navigationBarTitleText: '我的'
}


