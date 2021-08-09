import Taro, { useEffect, useState, useRouter } from "@tarojs/taro";
import network from '@/utils/network'
import debounce from 'lodash.debounce'
import {
  View, Input
} from "@tarojs/components";
import cityData from '../../../assets/js/cityData'
import QQMapWX from '../../../assets/js/qqmap-wx-jssdk.min.js';
import "./index.scss"

const qqmapsdk = new QQMapWX({
  key: 'CS7BZ-V2ZWQ-Q7455-G3YYK-5VSCZ-T4BQU'
});
export default function Index() {
  const { params } = useRouter()
  console.log(params, 'params')
  const [citys, setCitys] = useState([])
  const [searchResult, setSearchResult] = useState([])
  const [searchVisible, setSearchVisible] = useState(false)
  const [value, setValue] = useState(() => {
    if (Taro.getStorageSync('currentCity')) {
      return Taro.getStorageSync('currentCity').city
    } else if (Taro.getStorageSync('localCity')) {
      return Taro.getStorageSync('localCity').city
    } else {
      return ''
    }
  })
  const [currentCity, setCurrentCity] = useState(Taro.getStorageSync('currentCity') || Taro.getStorageSync('localCity'))
  useEffect(() => {
    qqmapsdk.reverseGeocoder({
      success: function (results) {
        console.log(results)
        setCurrentCity(
          results.result.address_component.city
        )
      }
    })
    network.Fetch({
      "obj": "user",
      "act": "list_city",
      "page": 1,
      "limit": 100
    }).then((data) => {
      setCitys(data.list)
    })
    //获取城市列表
    //调用获取城市列表接口
    qqmapsdk.getCityList({
      success: function (res) {//成功后的回调
        console.log(res);
        // console.log('省份数据：', res.result[0]); //打印省份数据

        const ra = res.result[0].filter((item) => (item.id.startsWith('11') || item.id.startsWith('12') || item.id.startsWith('31') || item.id.startsWith('50')))
        const rra = ra.map((item) => { return { ...item, cityName: item.fullname } })
        console.log(JSON.stringify(rra))
        const cityArray = res.result[1].filter((item) => {
          return !(item.id.startsWith('11') || item.id.startsWith('12') || item.id.startsWith('31') || item.id.startsWith('50'))
        })
        const getR = (id) => {
          const startId = id.slice(0, 2)
          return ra.filter((item) => item.id.startsWith(startId))[0].fullname
        }
        const result = cityArray.map((city) => {
          return { ...city, cityName: `${getR(city.id)}${city.fullname}` }
        })

        // console.log(JSON.stringify(result)); //打印城市数据
        // console.log('区县数据：', res.result[2]); //打印区县数据
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    });


    console.log(cityData)

  }, [])
  const handleSearch = debounce((e) => {
    const currentSearchResult = cityData.filter((item) => {
      return item.cityName.indexOf(e.target.value) !== -1
    })
    setValue(e.target.value)
    setSearchVisible(true)
    setSearchResult(currentSearchResult)
  }, 500)
  return (
    <View>
      <View className='label'>当前定位城市:</View>
      <Input className='cityName' value={value} onInput={handleSearch} placeholder='输入城市名' />
      <View className='hr'></View>
      {
        searchVisible ?

          <View className='search'>
            {searchResult.map((item) => {
              return (
                <View className='item' onClick={() => {
                  Taro.setStorageSync('currentCity', { city: item.fullname, latitude: item.location.lat, longitude: item.location.lng })
                  Taro.navigateBack()
                }}>
                  {item.cityName}
                </View>
              )
            })}
          </View> :
          <View>
            <View className='title'>
              已开通城市
            </View>
            <View className='citys'>
              {citys.map((item) => {
                return (
                  <View className='city' onClick={() => {
                    Taro.setStorageSync('currentCity', item)
                    Taro.navigateBack()
                  }}
                  >
                    {item.city}
                  </View>
                )
              })}
            </View>
          </View>
      }

    </View>
  )
}
Index.config = {
  navigationBarTitleText: '城市定位',
  navigationBarBackgroundColor: '#00A0E9',
  navigationBarTextStyle: 'white'
}
