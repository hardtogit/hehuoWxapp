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
      empty: false,
      loading:false
    };
    this.limit = 20;
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
  getData = (type) => {
    const {loading,noMore}=this.state
    if(loading||noMore){
      return
    }
    const {listDataStore,fetchFn,listDataKey}=this.props
    Taro.showLoading({
      title:'加载中...'
    })
    this.setState({loading:true})
    fetchFn({ page: this.page, limit: this.limit }).then(data => {
      Taro.hideLoading({})
      let arr = [];
      if (this.page === 1&&type==='init') {
        arr = data.list;
        if(data.list.length===0){
            this.setState({
              empty:true
            })
        }
      } else {
        arr = [...listDataStore[listDataKey], ...data.list];
        if(data.list.length===0){
          this.setState({
            noMore:true
          })
        }
      }
      this.page+=1;
      listDataStore.updateListData({key:listDataKey,listData:[...arr]})
      this.setState({loading:false})
    }).catch(()=>{
      this.setState({loading:false})
      Taro.hideLoading({})
    });
  };
  initLoad = () => {
    this.page = 1;
    this.setState({
      noMore: false,
      empty: false
    },()=>{
      this.getData('init');
    });
  };

  render() {
    const { dataSource,empty } = this.state;
    const {renderList,children,emptyText}=this.props
    return (
      <View>
     {
        empty&&
        <View className='empty'>
        <Image  className='emptyImg' src={require('../../assets/img/no_data.png')}></Image>
        <View className='emptyText'>
          {emptyText}
        </View>
      </View>
      }
        {children}
      </View>
    );
  }
}
export default Index;
