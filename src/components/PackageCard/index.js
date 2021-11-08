import Taro,{useState} from "@tarojs/taro";
import { View, Image,Icon } from "@tarojs/components";
import classNames from 'classnames'
import { countDistance } from "@/utils";
import fruit from '@/assets/img/home/fruit_icon.png'
import tea from '@/assets/img/home/tea_icon.png'
import room from '@/assets/img/home/room_icon.png'
import arrow from '@/assets/img/home/arrow_down_icon.png'



import { downUrl } from "../../config";
import "./index.scss";

export default function Index(props) {
  const { teaArt = {}, from } = props;
  const [visible, setVisible]=useState(true)
  const [checked, setChecked]=useState(true)

  return (
    <View
      className='card'
    >
      <View className='main'>
        <View className='left'>
          <Image className='cover' />
        </View>
        <View className='right'>
          <View className='name'>2小时礼盒套餐</View>
          <View className='discription'>
          一起开启您的美好时光
          </View>
          <View className='rights'>
            <View className='left'>
              <Image className='icon' src={tea} />
              <View className='text'>N选一</View>
            </View>
            <View className='center'>
              十里岩
            </View>
            <View className='right'>
            <Image className='icon' src={room} />
              <View className='text'>果盘</View>
            </View>
          </View>
          <View className='rights'>
          <View className='left'>
              <Image className='icon' src={room} />
              <View className='text'>包间费</View>
            </View>
            <View className='center'>
              2小时
            </View>
            <View className='right'>
            <Image className='icon' src={room} />
              <View className='text'>茶点</View>
            </View>
          </View>
          <View className='price'>
            <View className='orginPrice'>
            ￥156.00
            </View>
            <View className='defaultPrice'>
              门市价：368.00元
            </View>
          </View>
        </View>
      </View>
      {
        visible&&
        <View className='detail'>
          <View className='title'>
            <View className='line'></View>
            <View className='text'>套餐详情</View>
            <View className='line'></View>
          </View>
          <View className='item'>
            <View className='left'>
            <Image className='icon' src={tea} />
              <View className='text'>茶点</View>
            </View>
            <View className='center'>1份</View>
            <View className='right'>¥100</View>
          </View>
          <View className='item'>
            <View className='left'>
            <Image className='icon' src={fruit} />
              <View className='text'>果盘</View>
            </View>
            <View className='center'>1份</View>
            <View className='right'>¥68</View>
          </View>
          <View className='title'>
            <View className='line'></View>
            <View className='text'>以下项目任意选择一份</View>
            <View className='line'></View>
          </View>
          <View className='item'>
            <View className='left'>
            <Image className='icon' src={tea} />
              <View className='text'>十里岩</View>
            </View>
            <View className='center'>1盒</View>
            <View className='right'>¥68</View>
          </View>
          <View className='item'>
            <View className='left'>
            <Image className='icon' src={tea} />
              <View className='text'>碧螺春</View>
            </View>
            <View className='center'>1泡</View>
            <View className='right'>¥68</View>
          </View>
          <View className='item'>
            <View className='left'>
            <Image className='icon' src={tea} />
              <View className='text'>大红袍</View>
            </View>
            <View className='center'>1泡</View>
            <View className='right'>¥68
            <View className='checkboxContainer' onClick={()=>setChecked(!checked)}>
            {!checked&&<View  className={classNames(['checkbox', checked&&'active'])}></View>}
                      {checked&&<Icon className='gou' type='success' color='#00A0E9' size={16}></Icon>}
            </View>

            </View>
          </View>

        </View>
      }
      <View className='trigger' onClick={()=>setVisible(!visible)}>
            查看详情
            <Image className={classNames(['icon',visible&&'flip'])} src={arrow}></Image>
      </View>

    </View>
  );
}
