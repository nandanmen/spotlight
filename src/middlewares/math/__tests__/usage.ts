import mathMiddleware from '..'

describe('math middleware', () => {
  describe('usage', () => {
    const getResults = (input: string) =>
      mathMiddleware(input).map(result => result.value)

    it('returns empty array if input is not a math expression', () => {
      expect(getResults('abc')).toBeEmpty()
    })

    it('returns empty array if function has no arguments', () => {
      expect(getResults('sin()')).toBeEmpty()
    })

    it('performs simple arithmetic', () => {
      expect(getResults('3 + 3')).toContain(6)
    })

    describe('bedmas rules', () => {
      it.each`
        input                | result
        ${'3 + 3 * 4'}       | ${15}
        ${'(3 + 3) * 4'}     | ${24}
        ${'3 + (3 * 4 / 2)'} | ${9}
      `(`given $input returns $result`, ({ input, result }) => {
        expect(getResults(input)).toContain(result)
      })
    })

    describe('complex arithmetic', () => {
      it.each`
        input                         | result
        ${'1/2*((-2*(1+2))*10)'}      | ${-30}
        ${'1800/10*((12-6)+(24-12))'} | ${3240}
      `(`given $input returns $result`, ({ input, result }) => {
        expect(getResults(input)).toContain(result)
      })
    })

    it('evaluates functions', () => {
      expect(getResults('sin(max(450, 451))')).toContain(Math.sin(451))
    })
  })
})
