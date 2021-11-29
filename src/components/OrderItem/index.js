import Taro, { useState } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import classNames from 'classnames'
import dayjs from "dayjs";
import arrow from '@/assets/img/home/arrow_down_icon.png'
import { downUrl } from '../../config'
import "./index.scss";

export default function Index(props) {
  const { order, type } = props;
  const [visible, setVisible] = useState(false)
  const status = 1;
  return (
    <View className='order_item'>
      <View className='top at-row'>
        <View className='at-col at-col-8 left'>订单编号:{order._id}</View>
        <View className='at-col right'>{order.user_status}</View>
      </View>
      <View className='body'>
        <View className='left'>
          <Image
            className='cover'
            src={downUrl + order.shop_home_fid}
          ></Image>
        </View>
        <View className='right'>
          <View className='name'>{order.room_name}</View>
          {order.room_type === '一口价' ?
            <View>
              <View className='text'>
                {dayjs(
                  order.create_time * 1000
                ).format("MM月DD日 HH:mm")}
              </View>
              <View className='text'>
                一口价时段
              </View>
            </View>
            :
            <View>
              <View className='text'>
                {dayjs(
                  order.service_time && order.service_time.begin_time * 1000
                ).format("MM月DD日 HH:mm")}{" "}
                -{" "}
                {dayjs(
                  order.service_time && order.service_time.end_time * 1000
                ).format("MM月DD日 HH:mm")}
              </View>
              <View className='text'>
                共计{order.service_time && order.service_time.total_time}小时
              </View>
            </View>

          }

        </View>
      </View>
      {
        visible &&
        <View className='items'>
          <View className='item'>
            <View className='left'>优惠券：</View>
            <View className='right'>
              {(order.discount && order.discount.type === '优惠券') ?
                order.discount.discount_name : '未使用'
              }
            </View>
          </View>
          <View className='item'>
            <View className='left'>次卡：</View>
            <View className='right'>
              {(order.discount && order.discount.type === '次卡') ?
                order.discount.discount_name : '未使用'
              }
            </View>
          </View>
          {
            (order.combo_info && order.combo_info.combo_id) &&
            <View className='item'>
              <View className='left'>{order.combo_info.name}</View>
              <View className='right num'>{order.combo_info.money}元</View>
            </View>
          }
          {
            (order.teaart_info && order.teaart_info._id) &&
            <View className='item'>
              <View className='left'>茶艺师跟单：</View>
            </View>
          }
          {
            (order.teaart_info && order.teaart_info._id) &&
            <View className='item'>
              <View className='left'>{order.teaart_info.name}</View>
              <View className='right num'>{order.teaart_info.total_cost}元</View>
            </View>
          }
          {
            order.goods_info && order.goods_info.map((goods) => {
              return (
                <View className='item'>
                  <View className='left'>{goods.name}</View>
                  {/* <View className='center'>x{goods.number}</View> */}

                  <View className='right num'>{goods.allprice}元</View>
                </View>
              )

            })
          }

        </View>
      }

      <View className='trigger' onClick={() => setVisible(!visible)}>
        查看详情
        <Image className={classNames(['icon', visible && 'flip'])} src={arrow}></Image>
      </View>
      <View className='bottom'>
        <View className='left'>
          <View className='label'>合计：</View>
          <View className='unit'>¥</View>
          <View className='num'>{order.payment_amount}</View>
        </View>
        <View className='right'>
          {order.status == "待支付" && <View className='btn' onClick={() => {
            Taro.requestPayment({
              ...order.pay_info,
              success: function () {
                Taro.showToast({
                  title: '支付成功',
                  icon: 'none'
                })
              }
            })
          }}
          >去支付</View>}
          {(type == 'openCode') && (
            <View
              className='btn'
              onClick={() => {
                Taro.setStorageSync("currentOrder", order);
                Taro.navigateTo({ url: `/pages/home/openCode/index?id=${order._id}` });
              }}
            >
              查看开门码
            </View>
          )}
          {
            type === 'continue' &&
            <View
              className='btn'
              onClick={() => {
                Taro.setStorageSync("continueOrder", order);
                Taro.navigateTo({ url: `/pages/home/continueOrder/index?id=${order.room_id}&shop_id=${order.shop_id}&type=continue` });
              }}
            >
              我要续单
            </View>
          }

          {/* {order.status == "已使用" && <View className='btn'>续费</View>} */}
          {/* {status == 3 && <View className='btn'>删除订单</View>} */}
        </View>
      </View>
    </View>
  );
}
