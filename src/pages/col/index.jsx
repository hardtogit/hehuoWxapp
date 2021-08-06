import Taro, { Component, useDidShow } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import network from '@/utils/network'
import { inject, observer } from '@tarojs/mobx'
import ColItem from '@/components/ColItem'

import ListTemplate from '@/components/ListTemplate'
import "./index.scss";

@inject('listDataStore')
@observer
class Index extends Component {
  constructor(props) {
    super(props)
    this.listRef = {}
  }
  componentDidMount() {
    this.listRef.initLoad()
  }
  componentDidShow() {
    if (this.listRef) {
      this.listRef.initLoad()
    }
  }
  cancelCol = (id) => {
    network.Fetch({
      obj: 'user',
      act: 'del_collect',
      collect_id: id
    }).then(() => {
      this.listRef.initLoad()
    })
  }
  render() {
    const { colList } = this.props.listDataStore
    return (
      <View className='col'>
        <ListTemplate
          ref={(listRef) => { this.listRef = listRef }}
          emptyText="您暂时没有收藏的店铺"
          preLoad={false}
          listDataKey='colList'
          fetchFn={(params) =>
            network.Fetch({
              ...params,
              "obj": "user",
              "act": "list_shop_collect"
            })}
        >
          {colList.map((col) => {
            return (
              <ColItem col={col} cancelCol={this.cancelCol} />
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


