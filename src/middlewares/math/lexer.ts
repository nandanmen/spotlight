type TokenType =
  | 'operator'
  | 'number'
  | 'left_paren'
  | 'right_paren'
  | 'function'

export interface Token {
  type: TokenType
  value: string | number
}

export interface OperatorToken extends Token {
  type: 'operator'
  precedence: number
  associativity: 'left' | 'right'
}

const precedenceTable: Record<string, number> = {
  '+': 2,
  '-': 2,
  '/': 3,
  x: 3,
  '*': 3,
  '^': 4
}

const associativityTable: Record<string, 'left' | 'right'> = {
  '+': 'left',
  '-': 'left',
  '/': 'left',
  x: 'left',
  '*': 'left',
  '^': 'right'
}

function removeSpace(input: string): string {
  return input
    .split('')
    .filter(s => s !== ' ')
    .join('')
}

function isNumber(char: string) {
  return /[\d.]/.test(char)
}

function isOperator(char: string) {
  return /[\+\-\*\/]/.test(char)
}

function isStartOfNegativeNumber(char: string, prev: string) {
  return char === '-' && (isOperator(prev) || isLeftParen(prev) || !prev.length)
}

function isLeftParen(char: string) {
  return /[\(\[]/.test(char)
}

function isRightParen(char: string) {
  return /[\)\]]/.test(char)
}

export default function lex(input: string): Token[] {
  // remove spaces from input
  const trimmedInput = removeSpace(input)

  const result = [] as (Token | OperatorToken)[]

  let numBuffer = []
  let prev = ''
  // iterate through each character
  for (const char of trimmedInput) {
    // if a number, push the number to buffer
    if (isNumber(char) || isStartOfNegativeNumber(char, prev)) {
      numBuffer.push(char)
    } else {
      // once we have something not a number,
      // clear number buffer and add new token
      if (numBuffer.length) {
        result.push({
          type: 'number',
          value: Number(numBuffer.join(''))
        })
        numBuffer = []
      }

      if (isOperator(char)) {
        result.push({
          type: 'operator',
          value: char,
          precedence: precedenceTable[char],
          associativity: associativityTable[char]
        })
      }

      if (isLeftParen(char)) {
        result.push({
          type: 'left_paren',
          value: char
        })
      }

      if (isRightParen(char)) {
        result.push({
          type: 'right_paren',
          value: char
        })
      }
    }
    prev = char
  }

  // last token is a digit
  if (numBuffer.length) {
    result.push({
      type: 'number',
      value: Number(numBuffer.join(''))
    })
  }

  return result
}
