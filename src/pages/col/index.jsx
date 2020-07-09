import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import {inject,observer} from '@tarojs/mobx'
import ColItem from '@/components/ColItem'
import ListTemplate from '@/components/ListTemplate'
import "./index.scss";

@inject('listDataStore')
@observer
class Index extends Component{
  constructor(props){
    super(props)
  }
  render(){
    const {colList}=this.props.listDataStore
    return(
      <View className='col'>
             <ListTemplate
            preLoad
            listDataKey='colList'
            fetchFn={(params) =>
            network.Fetch({
              ...params,
              "obj":"user",
              "act":"list_card_user",
              "user_memb_stat":"未使用"
            })}
          >
          {colList.map((col)=>{
            return(
              <ColItem col={col}/>
            )
            })
            }

          </ListTemplate>
      </View>
    )
  }

}
Index.config = {
  navigationBarTitleText: '我的收藏'
}


