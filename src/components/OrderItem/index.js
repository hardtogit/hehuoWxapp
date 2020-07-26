import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import {downUrl} from '../../config'
import dayjs from "dayjs";
import "./index.scss";

export default function Index(props) {
  const { order } = props;
  const status = 1;
  return (
    <View className="order_item">
      <View className="top at-row">
        <View className="at-col at-col-8 left">订单编号:{order._id}</View>
        <View className="at-col right">{order.status}</View>
      </View>
      <View className="body">
        <View className="left">
          <Image
            className="cover"
            src={downUrl+order.shop_home_fid}
          ></Image>
        </View>
        <View className="right">
          <View className="name">{order.room_name}</View>
          <View className="text">
            {dayjs(
              order.service_time && order.service_time.begin_time * 1000
            ).format("MM月DD日 HH:mm")}{" "}
            -{" "}
            {dayjs(
              order.service_time && order.service_time.end_time * 1000
            ).format("MM月DD日 HH:mm")}
          </View>
          <View className="text">
            共计{order.service_time && order.service_time.total_time}小时
          </View>
        </View>
      </View>
      <View className="bottom">
        <View className="left">
          <View className="label">合计：</View>
          <View className="unit">¥</View>
          <View className="num">{order.payment_amount}</View>
        </View>
        <View className="right">
          {order.status == "待支付" && <View className="btn" onClick={()=>{
            Taro.requestPayment({
              ...order.pay_info,
              success:function(){
                Taro.showToast({
                  title:'支付成功',
                  icon:'none'
                })
              }
            })
          }}>去支付</View>}
          {order.status == "已预约" && (
            <View
              className="btn"
              onClick={() => {
                Taro.setStorageSync("currentOrder", order);
                Taro.navigateTo({ url: "/pages/home/openCode/index" });
              }}
            >
              查看开门码
            </View>
          )}
          {order.status == "已使用" && <View className="btn">续费</View>}
          {status == 3 && <View className="btn">删除订单</View>}
        </View>
      </View>
    </View>
  );
}
