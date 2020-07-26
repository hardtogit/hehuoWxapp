import Taro, { Component,useEffect ,useState,useDidShow} from "@tarojs/taro";
import network from '@/utils/network'
import {AtModal} from 'taro-ui'
import { View, Button, Text } from "@tarojs/components";
import "./index.scss";


const Index = () => {
  const [entity,setEntity]=useState({})
  const [coupons,setCoupons]=useState([])
  const [visible,setVisible]=useState(false)


  useDidShow(()=>{
      network.Fetch({
        "obj":"user",
        "act":"details"
      }).then((data)=>{
          setEntity(data)
      })
      network.Fetch({
        "obj":"user",
        "act":"list_recharge_rule"
      }).then((data)=>{
          setCoupons(data.list)
      })

    })
    const rechange=(coupon)=>{
      Taro.showLoading({
        title:'处理中，请稍后...',
        mask:true
      })
      network.Fetch({
        "obj":"user",
        "act":"recharge",
        "payment_amount":coupon.rule_rech_amount,
        rule_id:coupon._id
      }).then((res)=>{
          Taro.hideLoading({})
          Taro.requestPayment({
            ...res.pay_info,
            success:()=>{
                Taro.showToast({
                  title:'充值成功',
                  icon:'none'
                })
                setTimeout(()=>{
                   Taro.navigateBack({})
                },2000)
            }
          })
      }).catch(()=>{
        Taro.hideLoading({})
      })
  }
    return (
        <View className='wallet'>
             <AtModal
                isOpened={visible}
                title='提示'
                confirmText='确定'
                onClose={()=>setVisible(false)}
                onConfirm={()=>setVisible(false)}
                content='如果需要开具发票，请联系门店负责人开具'
              />
            <View className='header'>
                <View className='detail' onClick={()=>{Taro.navigateTo({url:'/pages/me/record/index'})}}>明细</View>
                <View className='money'>
                    {parseFloat(entity.balance||0).toFixed(2)}
            </View>
                <View className='total'>总额（元）</View>
            </View>
            <View className='content'>
                <View className='cell' onClick={()=>{Taro.navigateTo({url:"/pages/me/recharge/index"})}}>
                    <View className='left'>
                        账户充值
                    </View>
                    <View className='right'>
                        <Image className='icon' src={require('../../../assets/img/me/arrow_right.png')}></Image>
                    </View>
                </View>
                <View className='cell' onClick={()=>setVisible(true)}>
                    <View className='left'>
                        申请发票
                    </View>
                    <View className='right'>
                        <Image className='icon' src={require('../../../assets/img/me/arrow_right.png')}></Image>
                    </View>
                </View>
                <View className='activity'>
                  {coupons.map((coupon)=>{
                     return(
                      <View className='item' onClick={()=>rechange(coupon)}>
                        <View className='text'>
                     <View>充值满{coupon.rule_rech_amount}</View>
                     <View>送{coupon.rule_handsel_amount}元</View>
                        </View>
                    </View>

                     )



                  })}

                </View>

            </View>

        </View>
    )
}
Index.config = {
    navigationBarTitleText: '我的钱包',
    navigationBarBackgroundColor: '#00A0E9',
    navigationBarTextStyle: 'white'
}


