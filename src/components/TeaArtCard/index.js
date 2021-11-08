import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import classNames from 'classnames'
import { countDistance } from "@/utils";
import { downUrl } from "../../config";
import "./index.scss";

export default function Index(props) {
  const { teaArt = {}, from,entity } = props;
  return (
    <View
      className='card'
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
            <View className='text'>/小时</View>
          </View>
          <View className='time'>服务时间：8:00-22:00</View>
          <View className='star'></View>
        </View>

        <View className={classNames(['status',entity.status==='在线'&&'online',entity.status==='休息中'&&'rest',entity.status==='服务中'&&'service',])}>
          {entity.status}
        </View>
      </View>
      {entity.remarks&&
      <View className='bottom'>
      备注：{entity.remarks}
      </View>
      }

    </View>
  );
}
