import stringMiddleware from '..'

describe('string middleware', () => {
  describe('usage', () => {
    const context = ['apple', 'orange', 'watermelon', 'melon']
    const getResults = (input: string) =>
      stringMiddleware(input, context).map(r => r.value)

    it('filters items based on input', () => {
      expect(getResults('lon')).toIncludeSameMembers(['watermelon', 'melon'])
    })

    it('escapes regex special characters', () => {
      expect(getResults('sin(')).toBeEmpty()
    })

    describe('boolean operators', () => {
      it('interprets NOT', () => {
        expect(getResults('a NOT an')).toIncludeSameMembers([
          'apple',
          'watermelon'
        ])
      })

      it('interprets OR', () => {
        expect(getResults('app OR water')).toIncludeSameMembers([
          'apple',
          'watermelon'
        ])
      })

      it('interprets AND', () => {
        expect(getResults('ter AND lon')).toIncludeSameMembers(['watermelon'])
      })

      describe('complex operations', () => {
        it.each`
          query                                        | result
          ${'app OR water NOT apple'}                  | ${['watermelon']}
          ${'apple OR orange OR melon NOT watermelon'} | ${['apple', 'orange', 'melon']}
        `('given "$query" returns $result', ({ query, result }) => {
          expect(getResults(query)).toIncludeSameMembers(result)
        })
      })
    })
  })
})
