import Stack from './stack'
import { Token, OperatorToken } from './lexer'

function shouldPopFromStack(token: OperatorToken, stack: Stack<any>) {
  const top = stack.peek()

  if (!top) return false

  return (
    top.type !== 'left_paren' &&
    (top.type === 'function' ||
      (token.precedence < top.precedence ||
        (token.precedence === top.precedence && top.associativity === 'left')))
  )
}

/**
 * Parses the given tokens into an RPN string.
 * Implements the Shunting-Yard algorithm.
 */
export default function parse(input: Token[]): Token[] {
  const result = [] as Token[]
  const operators = new Stack<Token>()

  input.forEach(token => {
    if (token.type === 'number') {
      result.push(token)
    } else if (token.type === 'function') {
      operators.push(token)
    } else if (token.type === 'operator') {
      while (shouldPopFromStack(token as OperatorToken, operators)) {
        result.push(operators.pop()!)
      }
      operators.push(token)
    } else if (token.type === 'left_paren') {
      operators.push(token)
    } else if (token.type === 'right_paren') {
      while (operators.peek() && operators.peek().type !== 'left_paren') {
        result.push(operators.pop()!)
      }
      if (operators.peek() && operators.peek().type === 'left_paren') {
        operators.pop()
      }
    }
  })

  while (operators.peek()) {
    result.push(operators.pop()!)
  }

  return result
}
