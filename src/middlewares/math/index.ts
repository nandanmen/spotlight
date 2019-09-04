import lex from './lexer'
import parse from './parser'
import evaluate from './evaluator'
import { Result } from 'types'

/**
 * TODO: Add guard for non-math expression input
 *  - Currently still tries to parse the input
 *    even though it is not a math expression.
 */
function mathMiddleware(input: string, context?: any[]): Result[] {
  const result = evaluate(parse(lex(input)))
  return typeof result === 'number' ? [{ score: 100, value: result }] : []
}

mathMiddleware.name = 'math'

export default mathMiddleware
