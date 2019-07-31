import lex from './lexer'
import parse from './parser'
import evaluate from './evaluator'

/**
 * TODO: Add guard for non-math expression input
 *  - Currently still tries to parse the input
 *    even though it is not a math expression.
 */
export default function mathMiddleware(
  input: string,
  context?: any[]
): number[] {
  const result = evaluate(parse(lex(input)))
  return typeof result === 'number' ? [result] : []
}
