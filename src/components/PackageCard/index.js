import Taro, { useState } from "@tarojs/taro";
import { View, Image, Icon } from "@tarojs/components";
import classNames from 'classnames'
import { computeNumber } from "@/utils";
import { downUrl } from '@/config/index'
import fruit from '@/assets/img/home/fruit_icon.png'
import tea from '@/assets/img/home/tea_icon.png'
import roomIcon from '@/assets/img/home/room_icon.png'
import arrow from '@/assets/img/home/arrow_down_icon.png'

import "./index.scss";

export default function Index(props) {
  const { entity, onPackageListFn, room, timeScope } = props;

  const handleSelect = () => {
    if (entity.sub_type === '时段价' && ((timeScope.endTime - timeScope.startTime) / 3600 != entity.hour) && entity.selected == false) {
      Taro.showToast({ title: '已同步套餐时间', icon: 'none' })
    }

    const copy = { ...entity, preferential: computeNumber(countOriginPrice(), '-', entity.money).result, originPrice: countOriginPrice() }
    copy.selected = !copy.selected
    onPackageListFn(copy, 'select')
  }
  const handleVisible = () => {
    const copy = { ...entity }
    copy.visible = !copy.visible
    onPackageListFn(copy)
  }
  const handleChoice = (index) => {
    const copy = { ...entity }
    copy.products = [...copy.products.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          selected: true
        }
      } else {
        item.selected = false
        return item
      }
    })]
    console.log(copy.products, '结果')
    onPackageListFn(copy)
  }
  const countOriginPrice = () => {
    const selectProduct = entity.products && entity.products.filter((item) => {
      return item.selected
    })
    if (entity.sub_type === '时段价') {

      if (selectProduct.length !== 0) {
        return computeNumber(room.price.money, '*', entity.hour).next('*', 2).next('+', entity.dessert_price).next('+', entity.fruit_price).next('+', selectProduct[0].price).result
      } else {
        return computeNumber(room.price.money, '*', entity.hour).next('*', 2).next('+', entity.dessert_price).next('+', entity.fruit_price).result
      }
    } else {
      if (selectProduct.length !== 0) {
        return computeNumber(room.price.money, '+', entity.dessert_price).next('+', entity.fruit_price).next('+', selectProduct[0].price).result
      } else {
        return computeNumber(room.price.money, '+', entity.dessert_price).next('+', entity.fruit_price).result
      }
    }
  }
  console.log(entity, '我是产品')
  const seleProduct = entity.products && entity.products.filter((item) => item.selected)[0]
  return (
    <View
      className='card'
    >
      <View onClick={handleSelect} className={classNames(['main', entity.selected && 'active'])}>
        <View className='left'>
          <Image className='cover' src={downUrl + entity.combo_fid} />
          {
            entity.flag &&
            <View className='flag'>{entity.flag}</View>
          }
        </View>
        <View className='right' style={{ flex: 1 }}>
          <View className='name'>{entity.name}</View>
          <View className='discription'>
            {entity.remark ? entity.remark : '一起开启您的美好时光'}
          </View>
          <View className='rights'>
            <View className='left' style={{ whiteSpace: 'nowrap', flex: 1 }}>
              <Image className='icon' src={roomIcon} />
              <View className='text' style={{ width: '80rpx' }}>空间费</View>
              {entity.sub_type === '时段价' ?
                <View className='center' style={{ whiteSpace: 'nowrap', display: 'flex', marginLeft: '6px' }}>
                  {entity.hour}小时<View style={{ textDecoration: 'line-through', color: '#999', marginLeft: '2px' }}>¥{entity.hour * room.price.money * 2}</View>
                  {/* ：{computeNumber(room.price.money, '*', entity.hour).next('*', 2).result} */}
                </View> :
                <View className='center' style={{ whiteSpace: 'nowrap', display: 'flex', marginLeft: '6px' }}>
                  一口价<View style={{ textDecoration: 'line-through', color: '#999', marginLeft: "2px" }}>¥{room.price.money}</View>
                </View>
              }
            </View>


            {
              entity.fruit_number &&
              <View className='right' style={{ whiteSpace: 'nowrap' }}>
                <Image className='icon' src={fruit} />
                <View className='text'>果盘</View>
              </View>
            }
          </View>
          <View className='rights'>
            {
              entity.products.length !== 0 ?
                <View className='left' style={{ whiteSpace: 'nowrap', flex: 1 }}>
                  <Image className='icon' src={require('../../assets/img/home/Leaf@2x.png')} />
                  <View className='text' style={{ width: '80rpx' }}>{entity.products.length}选一</View>
                  {
                    entity.products.length !== 0 ?
                      <View className='center' style={{ whiteSpace: 'nowrap', marginLeft: '6px' }}>
                        {seleProduct.name}
                      </View> :
                      <View className='center' style={{ whiteSpace: 'nowrap', marginLeft: '6px' }}>
                      </View>
                  }
                </View> :
                <View className='left' style={{ whiteSpace: 'nowrap', flex: 1 }}>
                  {
                    entity.products.length !== 0 ?
                      <View className='center' style={{ whiteSpace: 'nowrap', marginLeft: '6px' }}>
                        {seleProduct.name}
                      </View> :
                      <View className='center' style={{ whiteSpace: 'nowrap', marginLeft: '6px' }}>
                      </View>
                  }
                </View>
            }

            {
              entity.dessert_number &&
              <View className='right' style={{ whiteSpace: 'nowrap' }}>
                <Image className='icon' src={tea} />
                <View className='text'>茶点</View>
              </View>
            }

          </View>
          <View className='price'>
            <View className='orginPrice'>
              ￥{entity.money.toFixed(2)}
            </View>
            <View className='defaultPrice' style={{ flex: 1, textAlign: 'center' }}>
              门市价：{countOriginPrice().toFixed(2)}元
            </View>
          </View>
        </View>
      </View>
      {
        entity.visible &&
        <View className='detail'>
          {
            (entity.dessert_number || entity.fruit) &&
            <View>
              <View className='title'>
                <View className='line'></View>
                <View className='text'>套餐详情</View>
                <View className='line'></View>
              </View>
              {entity.dessert_number &&
                <View>
                  <View className='item'>
                    <View className='left'>
                      <Image className='icon' src={tea} />
                      <View className='text'>茶点</View>
                    </View>
                    <View className={classNames(entity.dessert_price ? 'center' : 'right')}>{entity.dessert_number + entity.dessert_unit}</View>
                    {entity.dessert_price && <View className='right'>¥{entity.dessert_price}</View>}
                  </View>
                  {
                    entity.dessert_remark &&
                    <View className='item'>
                      {entity.dessert_remark}
                    </View>
                  }

                </View>
              }
              {
                entity.fruit_number &&
                <View>
                  <View className='item'>
                    <View className='left'>
                      <Image className='icon' src={fruit} />
                      <View className='text'>果盘</View>
                    </View>
                    <View className={classNames(entity.fruit_price ? 'center' : 'right')}>{entity.fruit_number + entity.fruit_unit}</View>
                    {entity.fruit_price && <View className='right'>¥{entity.fruit_price}</View>}
                  </View>
                  {
                    entity.fruit_remark &&
                    entity.dessert_remark &&
                    <View className='item'>
                      {entity.fruit_remark}
                    </View>
                  }
                </View>

              }
            </View>
          }
          {entity.products.length != 0 &&
            <View>
              <View className='title'>
                <View className='line'></View>
                <View className='text'>以下项目任意选择一份</View>
                <View className='line'></View>
              </View>
              {entity.products.map((product, index) => {
                return (
                  <View key={product.dessert_number}>
                    <View className='item'>
                      <View className='left'>
                        <Image className='icon' src={require('../../assets/img/home/Leaf@2x.png')} />
                        <View className='text'>{product.name}</View>
                      </View>
                      <View className='center'>{product.number + product.unit}</View>
                      <View className='right'>¥{product.price}
                        <View className='checkboxContainer' onClick={() => handleChoice(index)}>
                          {!product.selected && <View className={classNames(['checkbox', product.selected && 'active'])}></View>}
                          {product.selected && <Icon className='gou' type='success' color='#00A0E9' size={16}></Icon>}
                        </View>
                      </View>
                    </View>
                    {
                      product.remark &&
                      <View className='item'>
                        {product.remark}
                      </View>
                    }
                  </View>
                )
              })}
            </View>
          }

        </View>
      }
      <View className='trigger' onClick={handleVisible}>
        {entity.visible ? '关闭详情' : '查看详情'}
        <Image className={classNames(['icon', entity.visible && 'flip'])} src={arrow}></Image>
      </View>

    </View>
  );
}
