export default class Node {
  type: 'query' | 'operator'
  value: string
  parent: Node | null
  children: Node[]

  constructor(type: 'query' | 'operator', value: string) {
    this.type = type
    this.value = value
    this.parent = null
    this.children = []
  }

  addChild(node: Node) {
    this.children.push(node)
    node.parent = this
  }
}
