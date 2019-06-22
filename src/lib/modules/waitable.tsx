
export default class Waitable {
  $$status: number = 0
  $$when: Promise<any>
  $$resolve: Function
  $$reject: Function
  $$data: any

  when() {
    if (!this.$$when) {
      switch (this.$$status) {
        case 0:
          this.$$when = new Promise((resolve, reject) => {
            this.$$resolve = resolve
            this.$$reject = reject
          })
          break
        case 1:
          this.$$when = Promise.resolve(this.$$data)
          break
        case 2:
          this.$$when = Promise.reject(this.$$data)
          break
        default:
        throw new Error("bas status")
      }
    }
    return this.$$when
  }
  resolve(data) {
    this.$$status = 1
    this.$$data = data
    this.$$resolve && this.$$resolve(data)
  }
  reject(data) {
    this.$$status = 2
    this.$$data = data
    this.$$reject && this.$$reject(data)
  }
}
