import Taro from '@tarojs/taro'
import {downUrl} from '../../config'
import {View,Image} from '@tarojs/components'
import './index.scss'

export default function Index(props){
  const {tea}=props
return(
   <View className='card' onClick={()=>Taro.navigateTo({url:`/pages/home/storeDetail/index?id=${tea._id}`})}>
     <Image className='cover' src={downUrl+tea.home_fid}></Image>
     <Image className='tag' src={require('../../assets/img/home/tag.png')}></Image>
     <View className='time'>
        {tea.label} | {tea.business_time}
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
       {tea.distance}
       </View>
       <View className='address'>
         {tea.address}
       </View>
     </View>
   </View>
)
}
