import Taro from "@tarojs/taro";
import { Video, View } from "@tarojs/components";

class Index extends Taro.Component {
  static defaultProps = {
    list: []
  };

  render() {
    const { list } = this.props;
    console.log(list,'aa');
    return <View></View>;
  }
}
export default Index;
