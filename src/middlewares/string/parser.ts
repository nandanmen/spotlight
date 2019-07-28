import Node from './node'

function isBooleanOperator(word: string) {
  const lowerCaseWord = word.toLowerCase()
  return (
    lowerCaseWord === 'and' || lowerCaseWord === 'or' || lowerCaseWord === 'not'
  )
}

export default function parse(input: string) {
  const words = input.split(' ')

  if (words.length) {
    const isOperator = isBooleanOperator(words[0])
    let root = new Node(isOperator ? 'operator' : 'query', words[0])
    words.slice(1).forEach(word => {
      if (isBooleanOperator(word)) {
        const node = new Node('operator', word)
        node.addChild(root)
        root = node
      } else {
        const node = new Node('query', word)
        root.addChild(node)
      }
    })
    return root
  }

  return null
}
