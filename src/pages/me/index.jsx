import Taro, { Component ,useEffect} from "@tarojs/taro";
import { View, Button, Text, WebView, Image} from "@tarojs/components";
import "./index.scss";


const Index = () => {
  useEffect(()=>{
    wx.login({
      success(res){
        console.log(res)
      }
    })
  },[])
  return (
    <View className='me'>
      <View className='header'>
        <View className='top'>
          <View className='cover'>
            <Image className='img'></Image>
          </View>
          <View className='name'>你好</View>
        </View>
        <View className='bottom'>
          <View className='item'>
            <View className='num'>22</View>
            <View className='text'>优惠券</View>
          </View>
          <View className='item' onClick={()=>wx.navigateTo({url:'/pages/me/wallet/index'})}>
            <View className='num'>22</View>
            <View className='text'>钱包</View>
          </View>
          <View className='item'>
            <View className='num'>22</View>
            <View className='text'>积分</View>
          </View>
        </View>
      </View>
      <View className='funs'>
        <View className='item'>
          <View className='fun'>
            <Image className='img' src={require('../../assets/img/me/me1.png')}></Image>
            <View className='text'>
              优惠次卡
             </View>
          </View>
          <View className='fun two'>
            <Image className='img' src={require('../../assets/img/me/me2.png')}></Image>
            <View className='text'>
              加盟合作
             </View>
          </View>
          <View className='fun'>
            <Image className='img' src={require('../../assets/img/me/me3.png')}></Image>
            <View className='text'>
              商城
             </View>
          </View>
        </View>
        <View className='item two'>
          <View className='fun'>
            <Image className='img' src={require('../../assets/img/me/me4.png')}></Image>
            <View className='text'>
              关于我们
             </View>
          </View>
          <View className='fun'>
            <Image className='img' src={require('../../assets/img/me/me5.png')}></Image>
            <View className='text'>
              联系我们
             </View>
          </View>
          <View className='fun'>
            <Image className='img' src={require('../../assets/img/me/me6.png')}></Image>
            <View className='text'>
              常见问题
             </View>
          </View>
        </View>
      </View>
      <Button openType='getUserInfo'>ssss</Button> 
    </View>
  )
}
Index.config = {
  navigationBarTitleText: '我的'
}


