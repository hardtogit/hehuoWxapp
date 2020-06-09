import Taro ,{useReachBottom,useState, useEffect}from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import "./index.scss";
let page=1;
let limit=10;
export default function Index(props) {
  const [dataSource,setDataSource]=useState([{},{},{}])
  const [noMore,setNoMore]=useState(false)
  const [empty,setEmpty]=useState(false)
  useEffect(()=>{
    if(props.preLoad){
      initLoad()
    }
  },[])
  useReachBottom(() => {
    console.log('onReachBottom')
  })
  const getData=()=>{
    props.fetchFn({page,limit}).then((data)=>{
      console.log(data)
    })
  }
  const initLoad=()=>{
      page=1;
      setEmpty(false)
      setNoMore(false)
      getData()
  }
  return (
    <View className='listTemplate'>
      {props.renderItem(dataSource)}
   </View>
  );
}
