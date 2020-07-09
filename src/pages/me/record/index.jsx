import Taro, { Component ,useEffect,useState} from "@tarojs/taro";
import { View, Button, Text, WebView, Image,Input,Textarea} from "@tarojs/components";
import { observer, inject } from '@tarojs/mobx'
import dayjs from 'dayjs'
import ListTemplate from '@/components/ListTemplate'
import List from '@/components/List'

import network from '../../../utils/network'
import "./index.scss";

@inject('listDataStore')
@observer
class Index extends Component{
  constructor(props) {
    super(props);
    // this.deal=this.deal.bind(this)
    this.test=this.test.bind(this)
  }
  // componentDidMount(){
  //   this.test('aasss')
  //   console.log('aa')
  // }
test(text){
  console.log('aaa')
  console.log(text)
}
onReachBottom(){
  this.listRef.getData()
}
render(){
   const {record}=this.props.listDataStore
   console.log(record,'sss',this.props.listDataStore)
   return(
     <View className='record'>
        <ListTemplate  preLoad listDataKey='record' ref={(listRef)=>this.listRef=listRef}
          fetchFn={(params) =>
                        network.Fetch({
                          ...params,
                          "obj":"user",
                          "act":"list_recharge"
                        })
                      }
        >
            {record.map((rec)=>{
            return(
              <View className='item'>
                <View className='left'>
                  充值{rec.payment_amount}元
                </View>
                <View className='right'>
                  {dayjs(rec.create_time*1000).format('YYYY年MM月DD日')}
                </View>
              </View>
            )
            })
            }
        </ListTemplate>
        </View>
   )
}
}

Index.config = {
  navigationBarTitleText: '明细'
}


