import Taro from '@tarojs/taro'
import { View, Button, Text, Map, Input, Image, CoverView, CoverImage } from "@tarojs/components";
import {downUrl} from '@/config/index'
import classNames from 'classnames'
import './index.scss'

const Index = (props) => {
  const {entity,goodsListStore}=props
  const add=(e)=>{
    e.stopPropagation()
    const copy={...entity}
    if(copy.buyone==='false'){
      if(copy.count< copy.number){
        copy.count=copy.count+1
        goodsListStore.updateListData(copy)
        props.onUpdateListData(copy)
      }else{
        Taro.showToast({title:'库存不足',icon:'none'})
      }
    }else{
      if(copy.count< copy.number){
        if(copy.count===1){
          Taro.showToast({title:'每人限购一件',icon:'none'})
        }else{
          copy.count=copy.count+1
          goodsListStore.updateListData(copy)
          props.onUpdateListData(copy)
        }
      }else{
        Taro.showToast({title:'库存不足',icon:'none'})
      }
    }
  }
  const sub=(e)=>{
    e.stopPropagation()
    const copy={...entity}
    if(copy.count!==1){
      copy.count=copy.count-1
      goodsListStore.updateListData(copy)
      props.onUpdateListData(copy)
    }else{
      Taro.showToast({title:'至少购买一件',icon:'none'})
    }
  }

  const select=()=>{
    const copy={...entity}
    if(!copy.selected&&copy.buyone==='true'){
      Taro.showToast({title:'限购一份',icon:'none'})
    }
      copy.selected=!copy.selected
      goodsListStore.updateListData(copy)
      props.onUpdateListData(copy)
  }


  return (
    <View className={classNames(['goods',entity.selected&&'active'])} onClick={select}>
        <View className='coverC'>
        <Image className='cover' src={`${downUrl}${entity.goods_fid}`}>

</Image>
          {entity.flag&&
            <View className='flag'>{entity.flag}</View>
          }

        </View>

        <View className='content'>
            <View className='title'>{entity.name}</View>
            <View className='price'>
              <View className='currentPrice'>
                <View className='unit'>¥</View>
                <View className='num'>{entity.price}</View>
              </View>
              {entity.ori_price&&
              <View className='originPrice'>¥{entity.ori_price}</View>
              }
            </View>
            {entity.buyone==='true'?

            <View className='radio' >
            {entity.selected?
            <Image className='icon' src={require('../../../../../assets/img/home/goods_c.png')} />
            :
            <Image className='icon' src={require('../../../../../assets/img/home/goods_noC.png')} />
            }
          </View>
          :
<View className='contr'>
              <View className='sub' onClick={sub}>-</View>
              <View className='count'>{entity.count}</View>
              <View className='add' onClick={add}>+</View>
            </View>
          }


        </View>
    </View>
  )
}

export default Index
