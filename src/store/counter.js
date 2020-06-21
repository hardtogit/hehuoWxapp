import { observable } from 'mobx'

const counterStore = observable({
  counter: 0,
  counterStore() {
    this.counter++
  },
  increment() {
    console.log(this.counter)
    this.counter++
  },
  decrement() {
    this.counter--
  },
  incrementAsync() {
    setTimeout(() => {
      this.counter++
    }, 1000)
  }
})
export default counterStore