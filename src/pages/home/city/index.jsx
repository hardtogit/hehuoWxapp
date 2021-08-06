import Taro, { useEffect,useState,useRouter} from "@tarojs/taro";
import network from '@/utils/network'
import {
  View,
} from "@tarojs/components";
import QQMapWX from '../../../assets/js/qqmap-wx-jssdk.min.js';
import "./index.scss"

export default function Index(){
  const {params} =useRouter()
  console.log(params,'params')
  const [citys,setCitys]=useState([])
  const [currentCity,setCurrentCity]=useState('定位中...')
  useEffect(()=>{
    const  qqmapsdk = new QQMapWX({
      key: 'CS7BZ-V2ZWQ-Q7455-G3YYK-5VSCZ-T4BQU'
    });
    qqmapsdk.reverseGeocoder({
      success:function(results){
            console.log(results)
            setCurrentCity(
              results.result.address_component.city
            )
        }
      })
    network.Fetch({
      "obj":"user",
      "act":"list_city",
      "page":1,
      "limit":100
    }).then((data)=>{
      setCitys(data.list)
    })

  },[])
  return (
    <View>
      <View className='label'>当前定位城市:</View>
      <View className='cityName' onClick={()=>{
        Taro.removeStorageSync('currentCity')
          Taro.navigateBack()
      }}
      >
          {currentCity}
      </View>
      <View className='hr'></View>
      <View className='title'>
        已开通城市
      </View>
      <View className='citys'>
        {citys.map((item)=>{
          return (
            <View className='city' onClick={()=>{
              Taro.setStorageSync('currentCity',item)
                Taro.navigateBack()
            }}
            >
                {item.city}
            </View>
          )
        })}
      </View>
    </View>
  )
}
Index.config = {
  navigationBarTitleText: '城市定位',
  navigationBarBackgroundColor: '#00A0E9',
  navigationBarTextStyle: 'white'
}
