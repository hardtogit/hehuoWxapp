import Taro, { Component ,useState} from "@tarojs/taro";
import classNames from 'classnames'
import { View, Button, Text ,Image} from "@tarojs/components";
import network from '@/utils/network'
import ListTemplate from "@/components/ListTemplate";
import {inject,observer} from '@tarojs/mobx'
import OrderItem from '@/components/OrderItem'
import   "./index.scss";

const tabs=[{name:'待支付',id:1},{name:'已预约',id:2},{name:'已使用',id:3},{name:'已取消',id:4}]

@inject('listDataStore')
@observer
class Index extends Component{
  constructor(props){
        super(props)
        this.state={
          tabIndex:1
        }
  }
  render(){

    const {tabIndex}=this.state
    const {orderList}=this.props.listDataStore
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
          <ListTemplate  preLoad listDataKey='orderList'
          ref={(listRef)=>this.listRef=listRef}
          fetchFn={(params) =>
                        network.Fetch({
                          ...params,
                          "obj":"user",
                          "act":"list_order",
                          status:status
                        })
                      }
         >
            {orderList.map((order)=>{
            return(
              <View className='item'>
                <OrderItem order={order}/>
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
  navigationBarTitleText: '订单列表',

}
