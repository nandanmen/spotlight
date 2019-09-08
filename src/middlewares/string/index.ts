import parse from './parser'
import evaluate from './evaluator'
import { Result } from 'types'

function stringMiddleware(input: string, context: any[]): Result[] {
  return evaluate(parse(input), context)
}

stringMiddleware.spotlightName = 'string'

export default stringMiddleware
