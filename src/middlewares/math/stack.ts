export default class Stack<T> {
  private items: T[]

  constructor(...initialItems: T[]) {
    this.items = [...initialItems]
  }

  push(item: T) {
    this.items.push(item)
    return this
  }

  pop() {
    return this.items.pop()
  }

  peek() {
    return this.items[this.items.length - 1]
  }
}
