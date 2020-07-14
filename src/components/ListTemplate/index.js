import Taro, { useReachBottom, useState, useEffect, forw } from "@tarojs/taro";

import { observer, inject } from '@tarojs/mobx'
import { View, Image } from "@tarojs/components";
import "./index.scss";


@inject('listDataStore')
@observer
class Index extends Taro.Component {
  constructor(props) {
    super(props);
    this.state = {
      noMore: false,
      empty: false
    };
    this.limit = 10;
    this.page = 1;
  }
  componentDidMount() {
    console.log(this.props)
    if (this.props.preLoad) {
      this.initLoad();
    }
  }
  onReachBottom() {
    console.log("onReachBottom");
  }
  getData = () => {
    const {listDataStore,fetchFn,listDataKey}=this.props
    Taro.showLoading({
      title:'加载中...'
    })
    fetchFn({ page: this.page, limit: this.limit }).then(data => {
      Taro.hideLoading({})
      let arr = [];
      if (this.page === 1) {
        arr = data.list;
      } else {
        arr = [...listDataStore[listDataKey], ...data.list];
      }
      this.page+=1;
      listDataStore.updateListData({key:listDataKey,listData:arr})
    }).catch(()=>{
      Taro.hideLoading({})
    });
  };
  initLoad = () => {
    this.page = 1;
    this.setState({
      noMore: false,
      empty: false
    });
    this.getData();
  };

  render() {
    const { dataSource } = this.state;
    const {renderList,children}=this.props
    return (
      <View>
        {children}
      </View>
    );
  }
}
export default Index;
