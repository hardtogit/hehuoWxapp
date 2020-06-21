import Taro, { Component ,useState} from "@tarojs/taro";
import classNames from 'classnames'
import { View, Button, Text ,Image} from "@tarojs/components";
import OrderItem from '@/components/OrderItem'
import   "./index.scss";

const tabs=[{name:'待支付',id:1},{name:'已预约',id:2},{name:'已使用',id:3},{name:'已取消',id:4}]
export default  function Index(){
  const [tabIndex, setTabIndex]=useState(1)
  return(
    <View className='order'>
        <View className='tabs'>
          {
            tabs.map((tab)=>{
              return(
                <View className={classNames(['tab' ,tab.id==tabIndex&&'active'])}  key={tab.id} onClick={()=>setTabIndex(tab.id)}>
                  {tab.name}
                  <View className='line'></View>
                </View>
              )
            })
          }
        </View>
        <View className='container'>
          <View className='item'>
          <OrderItem />
          </View>
          <View className='item'>
          <OrderItem />
          </View>
          <View className='item'>
          <OrderItem />
          </View>
          </View>
    </View>


  )
}
Index.config = {
  navigationBarTitleText: '订单列表',

}
