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
    const [id,setId]=useState()
    const [timeCards,setTimeCards]=useState([])
    // const timeCards=Taro.getStorageSync('timeCards')

    if(router.params.type==1){//表示是优惠券
      console.log(router.params.couponId)
      setId(router.params.couponId)
      console.log(router.params.couponId)
    }
    useEffect(()=>{
      network.Fetch({
        "obj":"user",
        "act":"list_user_card_user",
        "shop_id":router.params.id||'o15937049856544559001',
        "begin_time":router.startTime|| dayjs(dayjs().format('YYYY-MM-DD')).unix(),
        "end_time":router.endTime|| dayjs(dayjs().format('YYYY-MM-DD 23:59:59')).unix(),
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
      const arr=timeCards.filter((item)=>id==item._id)
      console.log(arr,'sdsds')
      Taro.setStorageSync('discount',{type:'次卡',coupon:arr[0]})
      Taro.navigateBack({})
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
                        <View className='title'>{card.memb_off_time}小时/次</View>
                        <View className='time'>活动有效期：{dayjs(card.effective_time*1000).format('YYYY.MM.DD')}-{dayjs(card.expire_time*1000).format('YYYY.MM.DD')}</View>
                        </View>
                        {card.user_memb_stat=='未使用'&&
                          <View className={classNames(['btn',id==card._id&&'active'])}onClick={()=>{
                            setId(card._id)}}>
                          使用
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


