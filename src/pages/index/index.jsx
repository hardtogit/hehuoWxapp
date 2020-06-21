import Taro from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import {inject,observer,useLocalStore} from "@tarojs/mobx"
import counterStore from '../../store/counter'
import "./index.scss";

// @inject("counterStore")
// @observer
// class Index extends Taro.Component{
//   render(){
//     console.log(this.props)
//     return(
//           <View>
//      ssdasd
//     </View>
//     )
//   }
// }
function Index(props){
  console.log(counterStore)
  // const {counter,increment}=counterStore
  const store = useLocalStore(() => ({
    counter: 0,
    increment() {
      store.counter++
    },
    decrement() {
      store.counter--
    },
    incrementAsync() {
      setTimeout(() => store.counter++, 1000)
    }
  }))

  const { counter, increment, decrement, incrementAsync } = store;
  return(
    <View>
     {counter}
    <View onClick={increment}>+++++++++++</View>
    </View>
  )
}
  export default observer(Index);
// Index.config = {
//   navigationBarTitleText: '首页'
// }


