import Taro from '@tarojs/taro'
import classNames from 'classnames'
import { View, Image } from '@tarojs/components'
import './index.scss'

export default (props) => {
  const { selectTab } = props
  return (
    <View className='tabs'>
      <View className='tab' onClick={() => Taro.navigateBack()}>
        {selectTab === 'home' ?
          <Image className='img' src={require('../../assets/img/homeH.png')} /> :
          <Image className='img' src={require('../../assets/img/home.png')} />
        }
        <View className={classNames(['text', selectTab === 'home' && 'active'])}>首页</View>
      </View>
      <View className='tab' onClick={() => Taro.redirectTo({ url: '/pages/order/order/index' })}>
        {selectTab === 'order' ?
          <Image className='img' src={require('../../assets/img/orderH.png')} /> :
          <Image className='img' src={require('../../assets/img/order.png')} />
        }

        <View className={classNames(['text', selectTab === 'order' && 'active'])}>订单</View>      </View>
      <View className='tab' onClick={() => Taro.redirectTo({ url: '/pages/col/col/index' })}>
        {selectTab === 'col' ?
          <Image className='img' src={require('../../assets/img/colH.png')} />
          :
          <Image className='img' src={require('../../assets/img/col.png')} />
        }
        <View className={classNames(['text', selectTab === 'col' && 'active'])}>收藏</View>      </View>
      <View className='tab' onClick={() => Taro.redirectTo({ url: '/pages/me/mine/index' })} >
        {selectTab === 'me' ?
          <Image className='img' src={require('../../assets/img/meH.png')} />
          :
          <Image className='img' src={require('../../assets/img/me.png')} />
        }

        <View className={classNames(['text', selectTab === 'me' && 'active'])}>我的</View>      </View>
    </View>
  )






}
