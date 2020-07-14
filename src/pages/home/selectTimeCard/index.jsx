import Taro, { Component, useEffect, useState ,useRouter} from "@tarojs/taro";
import { View, Text, Input ,Image} from "@tarojs/components";
import dayjs from 'dayjs'
import network from '@/utils/network'
import classNames from 'classnames'
import TimesCardBuy from '@/components/TimesCardBuy'
import { observer, inject } from '@tarojs/mobx'
import "./index.scss";

const Index = (props) => {
    console.log(props)
    const router =useRouter()
    const {shop_id}=useRouter().params
    const [empty,setEmpty]=useState(false)
    const [timeCards,setTimeCards]=useState([])
    // const timeCards=Taro.getStorageSync('timeCards')
    useEffect(()=>{
      network.Fetch({
        "obj":"user",
        "act":"list_user_card_user",
        "shops_id":router.params.id||'o15937049856544559001',
        "page":1,
        "limit":100
      }).then((data)=>{
        setTimeCards(data.list)
        // setGetCoupons(data.ulist)
        if(!data.list||data.list.length===0){
          setEmpty(true)
        }
      })


    },[])
    const submit=()=>{


    }
    return (
        <View className='info'>
             {
              empty&&
              <View className='empty'>
              <Image  className='emptyImg' src={require('../../../assets/img/no_data.png')}></Image>
              <View className='emptyText'>
                暂无次卡
              </View>
            </View>
           }
             {timeCards.map((card)=>{
                  return(
                    <View className={classNames(['card',card.user_memb_stat=='未使用'&&'active'])}>
                    <View className='top'>
                      <View className='inner'>
                        <View className='left'>
                        <View className='title'>{card.memb_off_time}/次</View>
                        <View className='time'>活动有效期：{dayjs(card.effective_time).format('YYYY.MM.DD')}-{dayjs(card.expire_time).format('YYYY.MM.DD')}</View>
                        </View>
                        {card.user_memb_stat=='未使用'&&
                          <View className='btn' onClick={()=>Taro.navigateTo({
                            url:`/pages/home/storeDetail/index?id=${card.shop_id}`
                          })}>
                          去使用
                          </View>
                        }
                      </View>
                      <View className='name'>
                      限{card.shop_name}店使用
                      </View>
                    </View>

                </View>
                  )
             })}
   <View className='buttom'>
        <View className='right' onClick={submit}>
          预约
        </View>
      </View>

        </View>
    )
}
Index.config = {
    navigationBarTitleText: '选择次卡',
}


