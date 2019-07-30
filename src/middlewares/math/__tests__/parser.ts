import parse from '../parser'

describe('math middleware', () => {
  describe('parser', () => {
    it.each`
      input                | result
      ${'3 + 4'}           | ${'3 4 +'}
      ${'3 + 4 x (2 - 1)'} | ${'3 4 2 1 - x +'}
    `(`parses $input into $result`, ({ input, result }) =>
      expect(parse(input)).toEqual(result)
    )
  })
})
