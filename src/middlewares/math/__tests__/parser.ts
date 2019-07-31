import parse from '../parser'
import lex from '../lexer'

describe('math middleware', () => {
  describe('parser', () => {
    it.each`
      input                              | result
      ${'3 + 4'}                         | ${[3, 4, '+']}
      ${'3 + 4 * (2 - 1)'}               | ${[3, 4, 2, 1, '-', '*', '+']}
      ${'1/2*((-2*(1+2))*10)'}           | ${[1, 2, '/', -2, 1, 2, '+', '*', 10, '*', '*']}
      ${'3 + 4 * 2 / ( 1 - 5 ) ^ 2 ^ 3'} | ${[3, 4, 2, '*', 1, 5, '-', 2, 3, '^', '^', '/', '+']}
    `(`parses $input into $result`, ({ input, result }) => {
      const tokens = lex(input)
      const normalizedResult = parse(tokens).map(token => token.value)
      expect(normalizedResult).toEqual(result)
    })

    it('parses functions', () => {
      const tokens = lex('sin(max(2,3))')
      const result = parse(tokens).map(token => token.value)
      expect(result).toEqual([2, 3, 'max', 'sin'])
    })
  })
})
