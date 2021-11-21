import { observable } from "mobx";

const goodsListStore = observable({
  goodsList: [],
  updateListData(payload) {
    const newGoodsList = this.goodsList.map((item) => {
      if (item._id === payload._id) {
        return {
          ...payload
        }
      }
      return item
    })
    this.goodsList = [...newGoodsList]
  },
  initListData(payload) {
    console.log(payload,'擦粉噶康师傅嘎是广发卡时光分')
    this.goodsList = payload
  }
});
export default goodsListStore;
