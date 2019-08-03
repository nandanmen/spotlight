import Stack from './stack'
import { Token } from './lexer'

const add = (a: number, b: number) => a + b
const sub = (a: number, b: number) => a - b
const mul = (a: number, b: number) => a * b
const div = (a: number, b: number) => a / b
const pow = (a: number, b: number) => Math.pow(a, b)

const max = (a: number, b: number) => Math.max(a, b)
const min = (a: number, b: number) => Math.min(a, b)
const sqrt = (a: number, b: number) => Math.sqrt(b)
const log = (a: number, b: number) => Math.log(b)
const exp = (a: number, b: number) => Math.exp(b)
const sin = (a: number, b: number) => Math.sin(b)
const cos = (a: number, b: number) => Math.cos(b)
const tan = (a: number, b: number) => Math.tan(b)

const operations: Record<string, (a: number, b: number) => number> = {
  '+': add,
  '-': sub,
  '/': div,
  '*': mul,
  '^': pow,
  max,
  min,
  sqrt,
  log,
  exp,
  sin,
  cos,
  tan
}

export default function evaluate(postfix: Token[]): number | null {
  const stack = new Stack<Token>()

  postfix.forEach(token => {
    if (token.type === 'operator' || token.type === 'function') {
      if (!stack.peek() || typeof stack.peek().value !== 'number') return null
      const secondOperand = +stack.pop()!.value
      const firstOperand = stack.peek() ? +stack.pop()!.value : 0
      const performOperation = operations[token.value]
      stack.push({
        type: 'number',
        value: performOperation(firstOperand, secondOperand)
      })
    } else {
      stack.push(token)
    }
  })

  const result = stack.pop()
  return result && typeof result.value === 'number' ? result.value : null
}
