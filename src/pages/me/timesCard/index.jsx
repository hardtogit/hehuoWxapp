import Taro, { Component ,useEffect,useState} from "@tarojs/taro";
import classNames from 'classnames'
import {inject,observer} from '@tarojs/mobx'
import { View, Button, Text, WebView, Image} from "@tarojs/components";
import TimesCard from '@/components/TimesCard'
import ListTemplate from '@/components/ListTemplate'

import network from '../../../utils/network'
import "./index.scss";

const tabs=[{name:'未使用',id:1},{name:'已使用',id:2}]

@inject('listDataStore')
@observer
class Index extends Component{
  constructor(){
    this.state={
      tabIndex:1
    }
  }
  onReachBottom(){
    this.listRef.getData()
  }
  render(){
    const {tabIndex}=this.state
    const {cardList}=this.props.listDataStore
    const status=tabs.filter((item)=>item.id==tabIndex)[0].name
    return (
      <View className='card'>
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
          <ListTemplate
            ref={(listRef)=>{this.listRef=listRef}}
            preLoad
            listDataKey='cardList'
            fetchFn={(params) =>
            network.Fetch({
              ...params,
              "obj":"user",
              "act":"list_card_user",
              "user_memb_stat":status
            })}
          >
            {
              cardList.map((card)=>{
                return(
                  <TimesCard card={card}></TimesCard>
                )
              })
            }
          </ListTemplate>
      </View>
    )
  }

}
Index.config = {
  navigationBarTitleText: '我的VIP次卡'
}


