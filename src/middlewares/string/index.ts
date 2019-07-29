import parse from './parser'
import evaluate from './evaluator'

export default function stringMiddleware<T>(input: string, context: T[]): T[] {
  const tree = parse(input)
  return tree ? evaluate(tree, context) : []
}
