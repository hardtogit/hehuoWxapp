import Taro from '@tarojs/taro'
import {downUrl} from '../../config'
import {View,Image} from '@tarojs/components'
import {countDistance} from '@/utils'
import './index.scss'

export default function Index(props){
  const {tea,from}=props
return(
   <View className='card' onClick={
      ()=>{
        if(from==='home'){
          //消息订阅
          Taro.requestSubscribeMessage({
            tmplIds: ['RBdyC_9KLY9ZMKpg_yYPWmUodHJjnMZhIAjQ0ltUozk','7jChiILJld9TktkM9FbtkLmDKIQmdvhHeh5LFcyz12g','eGsZZUniSWVUTEajl0Pb4jw4g-0clu0w34hZp0m_PdI'],
            success: function () {
              Taro.navigateTo({url:`/pages/home/storeDetail/index?id=${tea._id}&from=${from}`})
            }
          })
          return
        }

        Taro.navigateTo({url:`/pages/home/storeDetail/index?id=${tea._id}&from=${from}`})
      }}
   >
     <Image className='cover' src={downUrl+tea.home_fid}></Image>
     {tea.buyinfo&&<View className='buyinfo'>{tea.buyinfo}</View>}
     <View className='coverBg'>

     </View>
     <Image className='tag' src={require('../../assets/img/home/tag.png')}></Image>
     <View className='time'>
        {tea.label} | {tea.business_time=="00:00-23:59"?'24h':tea.business_time}
     </View>
     <View className='content'>
       <View className='title'>
          {tea.shop_name}
       </View>
       <View className='labels'>
         {tea.features_serve.map((serve)=>{
            return (
            <View className='label'>
                {serve}
              </View>
            )
         })}
       </View>
       <View className='dis'>
       {countDistance(tea.distance) }
       </View>
       <View className='address'>
         {tea.address}
       </View>
       <View className='price'>
         <View className='unit'>¥</View>
        <View className='num'>{tea.min_price}</View>
         <View className='text'>起</View>
     </View>
     </View>

   </View>
)
}
