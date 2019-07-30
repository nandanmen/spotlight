export default class Stack<T> {
  private items: T[]

  constructor() {
    this.items = []
  }

  push(item: T) {
    this.items.push(item)
    return this
  }

  pop() {
    return this.items.pop()
  }
}
