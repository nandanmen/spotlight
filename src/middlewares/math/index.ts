import lex from './lexer'
import parse from './parser'
import evaluate from './evaluator'

export default function mathMiddleware(input: string, context?: any[]) {
  return evaluate(parse(lex(input)))
}
