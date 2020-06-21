import { observable } from 'mobx'

const userInfoStore = observable({
  userInfo: {},
  updateUserInfo(payload){
    this.userInfo=payload
  }
})
export default userInfoStore