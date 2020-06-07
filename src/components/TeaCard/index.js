import Taro from '@tarojs/taro'
import {View,Image} from '@tarojs/components'
import './index.scss'

export default function Index(){
return(
   <View className='card' onClick={()=>Taro.navigateTo({url:'/pages/home/storeDetail/index'})}>
     <Image className='cover' src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591474929602&di=8001aa17a6a6f298bc0b22c36d631bed&imgtype=0&src=http%3A%2F%2Fpic.shejiben.com%2Fcase%2F2014%2F04%2F16%2F20140416160054-089c2ef1.jpg"></Image>
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
