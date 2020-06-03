import Taro, { Component ,useEffect} from "@tarojs/taro";
import request from 'umi-request'
import { View, Button, Text ,Image} from "@tarojs/components";
import   "./index.scss";

export default  function Index(){
  useEffect(()=>{
    console.log(request)
    request
      .get('/api/v1/xxx?id=1')
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  },[])
  return(
    <View className='toolbar'>
      <View className='left'>
        <Image className='location' src={require('../../assets/img/home/location_one.png')}></Image>
         <Text>上海市晋安区</Text>
         <Image className='arrow_down'  src={require('../../assets/img/home/arrow_down.png')}></Image>
      </View>
      <View className='right'></View>
    </View>


  )
}
Index.config = {
  navigationBarTitleText: '首页',
  navigationBarBackgroundColor:'#00A0E9',
  navigationBarTextStyle:'white'
}
