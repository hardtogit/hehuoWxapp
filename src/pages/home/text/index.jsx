import Taro from "@tarojs/taro";
import { View, RichText } from "@tarojs/components";
import './index.scss'

const  Index= ()=>{
  const nodes=Taro.getStorageSync('richText').replace(/\<img/gi, '<img style="width:100%;height:auto" ')

  return(
    <View className='doc'>
        <RichText className='richText' nodes={nodes}></RichText>
      </View>
  )
}
Index.config = {
  navigationBarTitleText: '名流',
}
