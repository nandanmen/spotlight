import Stack from './stack'
import { Token } from './lexer'

const add = (a: number, b: number) => a + b
const sub = (a: number, b: number) => a - b
const mul = (a: number, b: number) => a * b
const div = (a: number, b: number) => a / b
const pow = (a: number, b: number) => Math.pow(a, b)

const operations: Record<string, (a: number, b: number) => number> = {
  '+': add,
  '-': sub,
  '/': div,
  x: mul,
  '*': mul,
  '^': pow
}

export default function evaluate(postfix: Token[]) {
  const stack = new Stack<Token>()

  postfix.forEach(token => {
    if (token.type === 'operator') {
      const secondOperand = +stack.pop()!.value
      const firstOperand = +stack.pop()!.value
      const performOperation = operations[token.value]
      stack.push({
        type: 'number',
        value: performOperation(firstOperand, secondOperand)
      })
    } else {
      stack.push(token)
    }
  })

  return stack.pop()!.value
}
