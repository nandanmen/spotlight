import Node from './node'

function escape(string: string) {
  return string.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&')
}

function match<T>(input: string, context: T[]) {
  return context.filter(value => new RegExp(escape(input)).test(String(value)))
}

function union<T>(arrOne: T[], arrTwo: T[]) {
  return [...arrOne, ...arrTwo]
}

function intersection<T>(arrOne: T[], arrTwo: T[]) {
  return arrOne.filter(v => arrTwo.includes(v))
}

function difference<T>(arrOne: T[], arrTwo: T[]) {
  return arrOne.filter(v => !arrTwo.includes(v))
}

export default function evaluate<T>(root: Node, context: T[]): T[] {
  if (root) {
    if (root.type === 'query') {
      return match(root.value, context)
    }

    const [left, right] = root.children
    const leftResults = evaluate(left, context)
    const rightResults = evaluate(right, context)

    switch (root.value.toLowerCase()) {
      case 'or':
        return union(leftResults, rightResults)
      case 'and':
        return intersection(leftResults, rightResults)
      case 'not':
        return difference(leftResults, rightResults)
      default:
        return []
    }
  }
  return [] as T[]
}
