import Taro from '@tarojs/taro'
import {View,Image} from '@tarojs/components'
import './index.scss'

export default function Index(){
return(
   <View className='card'>
     <Image className='cover' src={require('../../assets/img/home/fn_one.png')}></Image>
     <Image className='tag' src={require('../../assets/img/home/tag.png')}></Image>
     <View className='time'>
       智能店铺|24h
     </View>
     <View className='content'>
       <View className='title'>
         茶空间|智能测试
       </View>
       <View className='labels'>
         <View className='label'>
           投影仪
         </View>
         <View className='label'>
           充电宝
         </View>
       </View>
       <View className='dis'>
       距离您有三公里
       </View>
       <View className='address'>
        上海市接单工业路中央第五街1楼22层22室
       </View>
     </View>

   </View>
)
}
