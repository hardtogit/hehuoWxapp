import Taro, { Component ,useState,useEffect,useShareAppMessage} from "@tarojs/taro";
import { View, Button, Text, Map, Input, Image, CoverView,CoverImage } from "@tarojs/components";
import './index.scss'

const  Index= ()=>{
  return(
    <View className='doc'>
      <View className='title'>
        名流共享空间（用户协议）
      </View>
      <View className='subTitle'>
      尊敬的用户：
      </View>
      <View className='text'>
       感谢您使用名流共享空间(以下简称“名流” )
      </View>
      <View className='text'>
      名流是福州闪泡科技有限公司(以下简称“本公司”或“我们”)旗下的—个共享空间品牌，我们在此提醒您在注册成为名流用户时，即表示您接受本协议所包含的所有条款。本协议阐述之条款和条件适用于您使用名流所提供的各种设备、工具和服务。
      </View>
      <View className='subTitle'>
      —、用户注册
      </View>
      <View className='text'>
      (一)用户在使用名流服务前须用微信登录小程序，我们将给每个用户一个帐号，该帐号归本公司所有，用户获得帐号的使用权。本公司可以根据用户需求或产品需要对账号注册和绑定的方式进行变更，而无须事先通知用户。
      </View>
      <View className='text'>
      (二)用户可以通过名流小程序中“个人中心”界面浏览本人的个人信息和消费记录。
      </View>
      <View className='subTitle'>
      二、使用规则
      </View>
      <View className='text'>
      (一)用户在注册使用名流服务时，必须用微信进行登录， 且需要通过本公司或本公司合作运营方认证后方能开始使用。
      </View>
      <View className='text'>
      (二)名流中的茶叶、茶具、零食等消费品可通过无人售货柜自助购买，明码标价。用户使用微信扫码获取订单并且足额支付后，对应格子的门板即会自动打开，用户即可取用。如遇到无人售货柜故障，包括且不限于错开、不开等异常情况，请及时与客服联系，不可使用蛮力强开或者破坏。      </View>
      <View className='text'>
      (三)用户凭支付成功后系统生成订单开门二维码，获得订单对应时间段的名流及内部设备设施的使用权；订单结束前15分钟我们会提醒用户时间即将结束，如在订单结束之后有未被预约占用时间，用户可以继续下订单，继续使用；如果到订单结束，用户在后续时间未能预约成功，我们有权终止部分或者全部功能和服务(如会关闭照明、关闭水源、关闭空调等设备)并且通知用户离开，待保洁人员清洁后将空间提供给后续预约成功的用户使用；用户在离开时有关门的责任和义务。      </View>
      <View>
      <View className='subTitle'>
      三、服务内容
      </View>
      <View className='text'>
      名流服务主要包括用户登录、预订茶室/空间、获取订单开门二维码、推荐好友参与活动、自助购物以及查询分享历史使用记录等；
      </View>
      <View className='text'>
      (一)确保您在名流使用结束后，以正确步骤结束使用。名流不能也不会对您因未能遵守本款规定而发生的任何损失负责。
      </View>
      <View className='text'>
      (二)名流为预约计时预付费模式。计费区间：自用户预约开始时间起计，至用户预约结束时间止。由于各地消费水平、空间使用面积、地段、装修等不同，按实际小程序下单时显示的价格进行收费，一旦订单支付成功不允许退款，请在预约时注意。
      </View>
       <View className='subTitle'>
       四、账户及保护
      </View>
      <View className='text'>
      在注册账户过程中，将绑定您的手机号或微信号。您将自行负责对您的微信号和手机号的保密，且须对您的账户的所有活动承担责任。
      </View>
      <View className='text'>
      (一)如发现任何人未经授权使用您的账号，请及时通知客服；
      </View>
      <View className='text'>
      (二)用户承担账号的保管责任，并就其账号的活动负全部责任，因网络黑客或用户的保管疏漏导致账号、密码被他人非法使用的，本公司不承担责任。
      </View>
      <View className='subTitle'>
      五、服务变更、中断或终止
      </View>
      <View className='text'>
      (一)本公司有权随时变更、中断或者终止服务。如收费服务发生变更、中断或终止的事件，本公司应当在事先通知用户，并应向受影响的用户提供等值的替代性的收费服务，如有用户不愿意接受，本公司应当按照该用户实际使 用相应收费服务的情况扣除相应服务费之后，将剩余部分退还给该用户。
      </View>
      <View className='text'>
      (二)用户理解，由于网络技术的特殊性，本公司需要定期或不定期的进行服务平台的检修和维护，如因此类情况造成收费服务在合理时间内发生中断，本公司无需为此承担责任，且除特殊情况外应当进行通告。
      </View>
      <View className='text'>
      (三)如发生下列任何种情况，本公司有权随时中断或终止向用户提供本协议项目下的服务的全部或部分服务内容，而无需对用户或任何第三方承担任何责任；
      </View>
      <View className='text'>
      1)用户提供的个人信息真实性、完整性、准确性、合法性、有效性存在问题；
      </View>
      <View className='text'>
      2)用户违反本协议规定的使用规则；
      </View>
      <View className='text'>
      3)用户在使用收费服务时超时并且未按规定支付相应的服务费；
      </View>
      <View className='subTitle'>
        六、责任范围
       </View>
       <View className='text'>
        名流不提倡并坚决反对在名流内进行有违公序良俗的活动，用户应文明使用名流。本公司仅提供空间分时租赁服务，您在名流如触犯法律与本公司无关。
        您在使用名流期间，必须符合中国有关法律法规，不得在名流内从事以下行为：
      </View>
      <View className='text'>
      (一)反对宪法所确定的基本原则；
      </View>
      <View className='text'>
      (二)危害国家安全，泄露国家机密；
      </View>
      <View className='text'>
      (三)损害国家荣誉和利益；
      </View>
      <View className='text'>
      (四)煽动民族仇恨、民族歧视，破坏民族团结；
      </View>
      <View className='text'>
      (五)破坏国家宗教政策，宣扬邪教和封建迷信；
      </View>
      <View className='text'>
      (六)扰乱社会秩序，破坏社会稳定；
      </View>
      <View className='text'>
      (七)进行淫秽、色情、赌博、暴力、恐怖或者教唆犯罪；
      </View>
      <View className='text'>
      (八)侵害他人合法权益；
      </View>
      <View className='text'>
      (九)法律、行政法规禁止的其他内容；
      </View>
      <View className='text'>
      (十)不得利用本服务进行任何不利于本公司的行为。
      </View>
      <View className='text'>
      (十一)在名流使用期间，因正常使用而造成的设备损耗，属于正常使用范围，用户无需承担任何责任，但有义务告知客服人员。
      </View>
      <View className='text'>
      (十二)若因人为因素破坏或不当使用或疏忽遗忘导致名流内任何设备设施损坏、损毁，您需要对此负责，并 承担相应的维修、更换而产生的费用。
      </View>
      </View>
      <View>
      </View>
      </View>
  )
}
Index.config = {
  navigationBarTitleText: '用户协议',
}
