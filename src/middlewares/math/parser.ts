import { Stack } from 'util'
import lex from './lexer'

export default function parse(input: string): string {
  // trim input of whitespace then split by character
  const tokens = lex(input)
  console.log(tokens)

  const result = [] as string[]
  const operators = new Stack<string>()

  tokens.forEach(token => {
    // if token is a number, push to result
  })

  return result.join(' ')
}
