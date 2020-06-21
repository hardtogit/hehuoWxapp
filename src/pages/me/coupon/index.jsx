import Taro, { Component ,useState} from "@tarojs/taro";
import classNames from 'classnames'
import { View, Button, Text ,Image} from "@tarojs/components";
import ListTemplate from '@/components/ListTemplate'
import CouponItem from '@/components/CouponItem'
import   "./index.scss";
import { isTemplateSpan } from "typescript";

const tabs=[{name:'未领取',id:1},{name:'未使用',id:2},{name:'已使用',id:3},{name:'已过期',id:4}]
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
              <ListTemplate renderItem={()=>{
                return <View>
                <CouponItem />
                <CouponItem  use/>
                <CouponItem  timeout/>
                <CouponItem />
                <CouponItem />
                </View> 
              }}> 
              </ListTemplate>
          </View>
    </View>


  )
}
Index.config = {
  navigationBarTitleText: '首页',
  navigationBarBackgroundColor:'#00A0E9',
  navigationBarTextStyle:'white'
}
