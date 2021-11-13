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
    const authUserInfo=Taro.getStorageSync('authUserInfo')
    if(authUserInfo){
      Taro.showLoading({
        title:'登录中...'
      })
      Taro.login({
        success:(res)=>{
          console.log(res)
         network.Fetch({
            obj:'loginInfo',
            act:'get',
            code:res.code
         }).then((data)=>{
             console.log(data)
             // obj: "person",
             // act: "login",
             // verbose: 1,
             // login_name: acc,
             // login_passwd: pwd,
              network.Fetch({
               // obj: "person",
               // act: "login",
               // ctype: "user",
               // level: "user" ,
               // openid:data.response.openid,
               // access_token:data.response.session_key,
               // nickname:userInfo.nickName,
               // sex:userInfo.gender,
               // avatar_fid:userInfo.avatarUrl

               act: "login",
               obj: "person",
               credential_data: {
                 access_token:data.response.session_key,
                 avatar_fid:authUserInfo.avatar_fid,
                 ctype: "user",
                 level: "user",
                 nickname:authUserInfo.nickName,
                 openid:data.response.openid,
                 sess: "",
                 sex:authUserInfo.sex,
                 xtype: "user",
               },
               io: "i",
               perf: 1,
               sdk_version_webapp: "126",
               verbose: 1
             }).then((result)=>{
                   Taro.hideLoading({})
                   Taro.setStorageSync('userInfo', result.user_info)
                   Taro.setStorageSync('authUserInfo',result.user_info)
                   Taro.setStorageSync('sess2',result.sess)
                   if(result.user_info.phone){
                     Taro.navigateBack({})
                   }else{
                     Taro.redirectTo({url:'/pages/phone/index'})
                   }
                 })
             // network.Fetch({
             //   xtype:'user',
             //   openid:data.response.openid,
             //   access_token:data.response.session_key,
             //   nickname:userInfo.nickName,
             //   sex:userInfo.gender,
             //   avatar_fid:userInfo.avatarUrl
             // }).then((result)=>{
             //     Taro.hideLoading({})
             //     Taro.setStorageSync('userInfo', result.user_info)
             //     Taro.setStorageSync('sess',result.sess)
             //     if(result.user_info.phone){
             //       Taro.navigateBack({})
             //     }else{
             //       Taro.redirectTo({url:'/pages/phone/index'})
             //     }

             // })

         })

        }
      })
    }else{

      wx.getUserProfile({
        desc: '业务需要',
        success: response => {
          const userInfo=response.userInfo;
          if(userInfo){
            Taro.showLoading({
              title:'登录中...'
            })
            Taro.login({
              success:(res)=>{
                console.log(res)
               network.Fetch({
                  obj:'loginInfo',
                  act:'get',
                  code:res.code
               }).then((data)=>{
                   console.log(data)
                   // obj: "person",
                   // act: "login",
                   // verbose: 1,
                   // login_name: acc,
                   // login_passwd: pwd,
                    network.Fetch({
                     // obj: "person",
                     // act: "login",
                     // ctype: "user",
                     // level: "user" ,
                     // openid:data.response.openid,
                     // access_token:data.response.session_key,
                     // nickname:userInfo.nickName,
                     // sex:userInfo.gender,
                     // avatar_fid:userInfo.avatarUrl

                     act: "login",
                     obj: "person",
                     credential_data: {
                       access_token:data.response.session_key,
                       avatar_fid:userInfo.avatarUrl,
                       ctype: "user",
                       level: "user",
                       nickname:userInfo.nickName,
                       openid:data.response.openid,
                       sess: "",
                       sex:userInfo.gender,
                       xtype: "user",
                     },
                     io: "i",
                     perf: 1,
                     sdk_version_webapp: "126",
                     verbose: 1
                   }).then((result)=>{
                         Taro.hideLoading({})
                         Taro.setStorageSync('userInfo', result.user_info)
                         Taro.setStorageSync('authUserInfo',result.user_info)
                         Taro.setStorageSync('sess2',result.sess)
                         if(result.user_info.phone){
                           Taro.navigateBack({})
                         }else{
                           Taro.redirectTo({url:'/pages/phone/index'})
                         }
                       })
                   // network.Fetch({
                   //   xtype:'user',
                   //   openid:data.response.openid,
                   //   access_token:data.response.session_key,
                   //   nickname:userInfo.nickName,
                   //   sex:userInfo.gender,
                   //   avatar_fid:userInfo.avatarUrl
                   // }).then((result)=>{
                   //     Taro.hideLoading({})
                   //     Taro.setStorageSync('userInfo', result.user_info)
                   //     Taro.setStorageSync('sess',result.sess)
                   //     if(result.user_info.phone){
                   //       Taro.navigateBack({})
                   //     }else{
                   //       Taro.redirectTo({url:'/pages/phone/index'})
                   //     }

                   // })

               })

              }
            })
       }
        }
      })
    }






  }
  return (
    <View className='me'>
      <Image className='logo' src={require('../../assets/img/me/logo2.png')}></Image>
      <Button className='btn'  onClick={handleGetUserInfo}>授权登录</Button>
    </View>
  )
}
Index.config = {
  navigationBarTitleText: '登录'
}


