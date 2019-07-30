import parse from '../parser'
import lex from '../lexer'

describe('math middleware', () => {
  describe('parser', () => {
    it.each`
      input                              | result
      ${'3 + 4'}                         | ${[3, 4, '+']}
      ${'3 + 4 * (2 - 1)'}               | ${[3, 4, 2, 1, '-', '*', '+']}
      ${'1/2*((-2*(1+2))*10)'}           | ${[1, 2, '/', -2, 1, 2, '+', '*', 10, '*', '*']}
      ${'3 + 4 x 2 / ( 1 - 5 ) ^ 2 ^ 3'} | ${[3, 4, 2, 'x', 1, 5, '-', 2, 3, '^', '^', '/', '+']}
    `(`parses $input into $result`, ({ input, result }) => {
      const tokens = lex(input)
      expect(parse(tokens)).toEqual(result)
    })
  })
})
