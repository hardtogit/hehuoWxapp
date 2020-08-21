import { AtModal, AtModalHeader, AtModalContent, AtModalAction, AtIcon} from "taro-ui"
import Taro,{ useEffect ,useState} from "@tarojs/taro"
import classNames from 'classnames'
import network from '@/utils/network'
import { View ,Button,Text,Image} from "@tarojs/components"
import './index.scss'


export default function Index(props){
  const [userInfo,setUserInfo]=useState({})
  const [type,setType]=useState('payment')
  const {onOk,price,onCancel}=props
  useEffect(()=>{
    Taro.showLoading({
      title:'加载中...'
    })
    network.Fetch({
      "obj":"user",
      "act":"details"
    }).then((data)=>{
      Taro.hideLoading({})
      setUserInfo(data)
    }).catch(()=>{
      Taro.hideLoading({})
    })
  },[])
  // console.log(userInfo,'aa')
  return(
    <AtModal isOpened>
    {/* <AtModalHeader>选择支付方式</AtModalHeader> */}
    <AtModalContent>
    <View className='title'>选择支付方式</View>
    <View className='item one' onClick={()=>setType('payment')}>
       <View className='label'> 支付金额</View>
         <Text className='price'>¥{price}</Text>
       </View>
     <View className='item two' onClick={()=>setType('payment')}>
       <Image className='icon' src={require('../../assets/img/wx.png')}></Image>
       <View className='label'> 微信支付</View>
       {type==='payment'&&
         <AtIcon value='check' color="#0096DA" size='24'>

         </AtIcon>
       }
      </View>
      <View className={classNames(['item',price>userInfo.balance&&'disabled'])} onClick={()=>{if(price>userInfo.balance){return}; setType('balance')}}>
       <Image className='icon' src={require('../../assets/img/qian.png')}></Image>
        <View className='label'>余额支付 <Text className='balance'>{userInfo.balance}</Text> </View>
        {type==='balance'&&
         <AtIcon value='check' color="#0096DA" size='24'>
        </AtIcon>
       }
       {
         price>userInfo.balance&&
         <View>余额不足<Text className='tip' onClick={()=>{onCancel();Taro.navigateTo({url:'/pages/me/wallet/index'})}}>去充值</Text></View>
       }
     </View>
  </AtModalContent>
  <AtModalAction> <Button onClick={onCancel}>取消</Button> <Button onClick={()=>onOk(type)}>确定</Button> </AtModalAction>
</AtModal>
  )
}
