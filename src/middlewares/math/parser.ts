import Stack from './stack'
import { Token, OperatorToken } from './lexer'

function shouldPopFromStack(token: OperatorToken, stack: Stack<any>) {
  const top = stack.peek()

  if (!top) return false

  return (
    top.type !== 'left_paren' &&
    (token.precedence < top.precedence ||
      (token.precedence === top.precedence && top.associativity === 'left'))
  )
}

/**
 * Parses the given tokens into an RPN string.
 * Implements the Shunting-Yard algorithm.
 */
export default function parse(input: Token[]): (string | number)[] {
  const result = [] as (string | number)[]
  const operators = new Stack<Token>()

  input.forEach(token => {
    if (token.type === 'number') {
      result.push(token.value)
    } else if (token.type === 'operator') {
      while (shouldPopFromStack(token as OperatorToken, operators)) {
        result.push(operators.pop()!.value)
      }
      operators.push(token)
    } else if (token.type === 'left_paren') {
      operators.push(token)
    } else if (token.type === 'right_paren') {
      while (operators.peek() && operators.peek().type !== 'left_paren') {
        result.push(operators.pop()!.value)
      }
      if (operators.peek() && operators.peek().type === 'left_paren') {
        operators.pop()
      }
    }
  })

  while (operators.peek()) {
    result.push(operators.pop()!.value)
  }

  return result
}
