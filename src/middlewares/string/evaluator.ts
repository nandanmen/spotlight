import Node from './node'
import { Result } from 'types'

function escape(string: string) {
  return string.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&')
}

/**
 * TODO: Change this so it uses a string-similarity algorithm.
 */
function match(input: string, context: any[]): Result[] {
  return context
    .filter(value => new RegExp(escape(input)).test(String(value)))
    .map(value => ({ score: 100, value }))
}

function union(arrOne: any[], arrTwo: any[]) {
  return [...new Set([...arrOne, ...arrTwo])]
}

function intersection(arrOne: any[], arrTwo: any[]) {
  return [
    ...new Set(
      arrOne.filter(one => arrTwo.find(two => two.value === one.value))
    )
  ]
}

function difference(arrOne: any[], arrTwo: any[]) {
  return [
    ...new Set(
      arrOne.filter(one => !arrTwo.find(two => two.value === one.value))
    )
  ]
}

export default function evaluate(root: Node | null, context: any[]): Result[] {
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
  return [] as Result[]
}
