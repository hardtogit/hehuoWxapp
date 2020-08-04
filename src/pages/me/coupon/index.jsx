import Taro, { Component ,useState} from "@tarojs/taro";
import classNames from 'classnames'
import { View, Button, Text ,Image} from "@tarojs/components";
import network from '@/utils/network'
import {inject,observer} from '@tarojs/mobx'
import ListTemplate from '@/components/ListTemplate'
import CouponItem from '@/components/CouponItem'
import   "./index.scss";

const tabs=[{name:'未领取',id:1},{name:'未使用',id:2},{name:'已使用',id:3},{name:'已过期',id:4}]
@inject('listDataStore')
@observer
class Index extends Component{
  constructor(props){
      super(props)
      this.state={
        tabIndex:1
      }
  }
  onReachBottom(){
    this.listRef.getData()
  }
  render(){
    const {tabIndex}=this.state
    const {couponList}=this.props.listDataStore
    const status=tabs.filter((item)=>item.id==tabIndex)[0].name
    return(
      <View className='order'>
          <View className='tabs'>
            {
              tabs.map((tab)=>{
                return(
                  <View className={classNames(['tab' ,tab.id==tabIndex&&'active'])}  key={tab.id} onClick={()=>this.setState({tabIndex:tab.id},()=>{
                    this.listRef.initLoad()
                  })}>
                    {tab.name}
                    <View className='line'></View>
                  </View>
                )
              })
            }
          </View>
          <View className='container'>
          <ListTemplate  preLoad listDataKey='couponList'
            ref={(listRef)=>this.listRef=listRef}
            fetchFn={(params) =>
                          network.Fetch({
                            ...params,
                            "obj":"user",
                            "act":"list_discounts",
                            user_disc_stat:status
                          })
                        }
           >
              {couponList.map((coupon)=>{
              return(
                <View className='item'>
                  <CouponItem coupon={coupon} status={status} reLoad={()=>{this.listRef.initLoad()}} />
                </View>
              )
              })
              }
          </ListTemplate>
            </View>
      </View>
    )
  }
}
Index.config = {
  navigationBarTitleText: '优惠券',
  navigationBarBackgroundColor:'#00A0E9',
  navigationBarTextStyle:'white'
}
