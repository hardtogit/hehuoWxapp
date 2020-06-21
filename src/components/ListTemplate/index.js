import Taro, { useReachBottom, useState, useEffect, forw } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import "./index.scss";
class Index extends Taro.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      noMore: false,
      empty: false
    }
    this.limit = 10;
    this.page = 1

  }
  componentDidMount(){
    this.props.renderItem('asdasdas')
    if (this.props.preLoad) {
      this.initLoad()
     
    }
  }
  onReachBottom(){
    console.log('onReachBottom')
  }
  getData = () => {
    const {dataSource}=this.state
    this.props.fetchFn({ page:this.page, limit:this.limit }).then((data) => {
      let arr=[]
      if(this.page===1){
          arr=data.list
      }else{
        arr=[...dataSource,...data.list]
      }
      console.log(arr,data)
      this.setState({
        dataSource:arr
      })
    })
  }
  initLoad = () => {
    this.page = 1;
    this.setState({
      noMore: false,
      empty: false
    })
    this.getData()
  }
  render() {
    const {dataSource}=this.state
    // const {renderItem}=this.props
    return (
      <View className='listTemplate'>
        {this.props.renderItem('sdas')}
      </View>
    )
  }
}
export default Index

