import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import classNames from 'classnames'
import { countDistance } from "@/utils";
import teaStar from '@/assets/img/home/teaStar.png'
import { downUrl } from "../../config";
import "./index.scss";

export default function Index(props) {
  const {teaart={}, setTeaart,entity } = props;
  return (
    <View
      className={classNames(['card',entity._id===teaart._id&&'active',entity.remarks&&'mark'])}
      onClick={()=>{if(setTeaart){setTeaart(teaart._id===entity._id?'':entity)}else{
          Taro.showToast({title:'请先下单并预约',icon:'none'})
      }}}
    >
      <View className='top'>
        <Image className='cover' src={downUrl + entity.avatar_fid}></Image>
        <View className='center'>
          <View className='name'>{entity.name}</View>
          <View className='labels'>
            {entity.flag&&entity.flag.map((label)=>{
              return(
                <View className='label' key={label}>{label}</View>
              )
            })}
          </View>
          <View className='price'>
            <View className='unit'>¥</View>
            <View className='num'>{entity.cost}</View>
            <View className='text'>{entity.costinfo.indexOf('一口价')!==-1?'元':'/小时'}</View>
          </View>
          <View className='time'>服务时间：{entity.time}</View>
          <View className='star'>
            <Image className='icon' src={teaStar} />
            <Image className='icon' src={teaStar} />
            <Image className='icon' src={teaStar} />
            <Image className='icon' src={teaStar} />
            <Image className='icon' src={teaStar} />
          </View>
        </View>

        <View className={classNames(['status',entity.status==='在线'&&'online',entity.status==='休息中'&&'rest',entity.status==='服务中'&&'service',])}>
          {entity.status}
        </View>
      </View>
      {entity.remarks&&
      <View className='bottom'>
      个性签名：{entity.remarks}
      </View>
      }

    </View>
  );
}
