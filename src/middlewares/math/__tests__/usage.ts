import mathMiddleware from '..'

describe('math middleware', () => {
  describe('usage', () => {
    it('performs simple arithmetic', () => {
      expect(mathMiddleware('3 + 3')).toEqual(6)
    })

    describe('bedmas rules', () => {
      it.each`
        input                | result
        ${'3 + 3 * 4'}       | ${15}
        ${'(3 + 3) * 4'}     | ${24}
        ${'3 + (3 * 4 / 2)'} | ${9}
      `(`given $input returns $result`, ({ input, result }) => {
        expect(mathMiddleware(input)).toEqual(result)
      })
    })

    describe('complex arithmetic', () => {
      it.each`
        input                         | result
        ${'1/2*((-2*(1+2))*10)'}      | ${-30}
        ${'1800/10*((12-6)+(24-12))'} | ${3240}
      `(`given $input returns $result`, ({ input, result }) => {
        expect(mathMiddleware(input)).toEqual(result)
      })
    })

    it('evaluates functions', () => {
      expect(mathMiddleware('sin(max(450, 451))')).toEqual(Math.sin(451))
    })
  })
})
