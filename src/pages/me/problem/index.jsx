import Taro, { Component ,useEffect,useState} from "@tarojs/taro";
import { View, Button, Text, WebView, Image} from "@tarojs/components";
import ProblemItem from '@/components/ProblemItem'
import network from '../../../utils/network'
import "./index.scss";


const Index = () => {
  const [problemList,setProblemList]=useState([])
  useEffect(()=>{
    network.Fetch({
      "obj":"user",
		  "act":"list_problem"
    }).then((res)=>{
      console.log(res)
      setProblemList(res.list)
    })
  },[])
  return (
    <View className='about'>
      {problemList.map((problem)=>{
        return (
          <ProblemItem problem={problem} />
        )
      })}

    </View>
  )
}
Index.config = {
  navigationBarTitleText: '常见问题'
}


