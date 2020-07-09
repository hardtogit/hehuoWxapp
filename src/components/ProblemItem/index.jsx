import Taro, { Component ,useEffect,useState} from "@tarojs/taro";
import classNames from 'classnames'
import { View, Button, Text, WebView, Image} from "@tarojs/components";
import network from '../../utils/network'
import "./index.scss";


const Index = (props) => {
  const [visible,setVisible]=useState(false)
  const {problem}=props
  return (
    <View className='problem'>
        <View className='title' onClick={()=>{setVisible(!visible)}}>
          <View className='inner'>
            <View className='text'>
            {problem.title}
            </View>
          <View className={classNames(['arrow',visible&&'up'])}></View>
          </View>

        </View>
        {visible&&
  <View className='answer'>
  <View className='inner'>
  {problem.answer}
    </View>

  </View>
        }

    </View>
  )
}
Index.config = {
  navigationBarTitleText: '常见问题'
}


