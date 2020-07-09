import Taro, { Component ,useEffect,useState} from "@tarojs/taro";
import { View, Button, Text, WebView, Image,Input,Textarea} from "@tarojs/components";
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"
import ProblemItem from '@/components/ProblemItem'
import network from '../../../utils/network'
import "./index.scss";


const Index = () => {
  const [problemList,setProblemList]=useState([])
  const [isOpened, setIsOpened] = useState(false)
  const [city, setCity] = useState('')

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [suggestion_msg, setSuggestion_msg] = useState('')


  useEffect(()=>{
    network.Fetch({
      "obj":"user",
		  "act":"list_problem"
    }).then((res)=>{
      setProblemList[res.data]
    })
  },[])
  const submit=()=>{
    network.Fetch({
      "obj":"user",
      "act":"set_alliance",
      "city":city,
      "name":name,
      "phone":phone,
      "suggestion_msg":suggestion_msg
    }).then(()=>{
      setIsOpened(true)
    })
  }
  return (
    <View className='apply'>
      <View className='inputGroup'>
        <View className='label'>
          所在城市（或意向开店城市）<View className='char'>*</View>
        </View>
        <Input className='input' placeholder='必填' value={city} onInput={(e)=>{
            setCity(e.detail.value)
        }}
        ></Input>
      </View>
      <View className='inputGroup'>
        <View className='label'>
          您的姓名<View className='char'>*</View>
        </View>
        <Input className='input' placeholder='必填' value={name} onInput={(e)=>{
            setName(e.detail.value)
        }}
        ></Input>
      </View>
      <View className='inputGroup'>
        <View className='label'>
          您的电话<View className='char'>*</View>
        </View>
        <Input className='input' placeholder='必填' value={phone} onInput={(e)=>{
            setPhone(e.detail.value)
        }}
        ></Input>
      </View>
      <View className='inputGroup last' >
        <View className='label'>
          留言建议（选填）
        </View>
      </View>
      <Textarea className='textarea' placeholder='您可以留下您的宝贵建议或留言，方便我们更好的为您服务...' value={suggestion_msg} onInput={(e)=>{
            setSuggestion_msg(e.detail.value)
        }}
      ></Textarea>

      <View className='btn' onClick={submit}>
        提交申请
      </View>
      <AtModal
        isOpened={isOpened}
        title='提交成功'
        confirmText='返回上一级'
        onConfirm={()=>{
          setIsOpened(false)
          Taro.navigateBack({})
        }}
        content=' 工作人员将在3-5个工作日与您联系 '
      />
    </View>
  )
}
Index.config = {
  navigationBarTitleText: '合作加盟'
}


