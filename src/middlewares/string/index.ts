import parse from './parser'
import evaluate from './evaluator'
import { Result } from 'types'

export default function stringMiddleware(
  input: string,
  context: any[]
): Result[] {
  return evaluate(parse(input), context)
}
