import { observable } from "mobx";

const listDataStore = observable({
  record: [],
  teaList: [],
  colList:[],
  orderList:[],
  couponList:[],
  cardList:[],
  codeList:[],
  continueList:[],
  updateListData(payload) {
    this[payload.key] = payload.listData;
  }
});
export default listDataStore;
