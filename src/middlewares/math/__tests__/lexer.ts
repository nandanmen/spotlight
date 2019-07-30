import lex from '../lexer'

describe('math middleware', () => {
  describe('lexer', () => {
    it('interprets basic expression', () => {
      const tokens = lex('450 + 500')
      expect(tokens).toEqual([
        {
          type: 'number',
          value: 450
        },
        {
          type: 'operator',
          value: '+',
          precedence: 2,
          associativity: 'left'
        },
        {
          type: 'number',
          value: 500
        }
      ])
    })

    it('interprets negative numbers', () => {
      const tokens = lex('-6 * 50')
      expect(tokens).toEqual([
        {
          type: 'number',
          value: -6
        },
        {
          type: 'operator',
          value: '*',
          precedence: 3,
          associativity: 'left'
        },
        {
          type: 'number',
          value: 50
        }
      ])
    })

    it('interprets parentheses', () => {
      const tokens = lex('(3 + 3) * 4')
      expect(tokens).toEqual([
        {
          type: 'left_paren',
          value: '('
        },
        {
          type: 'number',
          value: 3
        },
        {
          type: 'operator',
          value: '+',
          precedence: 2,
          associativity: 'left'
        },
        {
          type: 'number',
          value: 3
        },
        {
          type: 'right_paren',
          value: ')'
        },
        {
          type: 'operator',
          value: '*',
          precedence: 3,
          associativity: 'left'
        },
        {
          type: 'number',
          value: 4
        }
      ])
    })
  })
})
