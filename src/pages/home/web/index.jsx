import Taro, { useRouter} from "@tarojs/taro";
import { View,WebView } from "@tarojs/components";
import './index.scss'

const  Index= ()=>{
  const router=useRouter()
  console.log(router)
  return(
    <WebView src={router.params.url}></WebView>
  )
}
Index.config = {
  navigationBarTitleText: '精归叙',
}
