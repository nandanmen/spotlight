import stringMiddleware from '..'

describe('string middleware', () => {
  describe('usage', () => {
    const context = ['apple', 'orange', 'watermelon', 'melon']

    it('filters items based on input', () => {
      expect(stringMiddleware('lon', context)).toIncludeSameMembers([
        'watermelon',
        'melon'
      ])
    })

    it('escapes regex special characters', () => {
      expect(stringMiddleware('sin(', context)).toBeEmpty()
    })

    describe('boolean operators', () => {
      it('interprets NOT', () => {
        expect(stringMiddleware('a NOT an', context)).toIncludeSameMembers([
          'apple',
          'watermelon'
        ])
      })

      it('interprets OR', () => {
        expect(stringMiddleware('app OR water', context)).toIncludeSameMembers([
          'apple',
          'watermelon'
        ])
      })

      it('interprets AND', () => {
        expect(stringMiddleware('ter AND lon', context)).toIncludeSameMembers([
          'watermelon'
        ])
      })

      describe('complex operations', () => {
        it.each`
          query                                        | result
          ${'app OR water NOT apple'}                  | ${['watermelon']}
          ${'apple OR orange OR melon NOT watermelon'} | ${['apple', 'orange', 'melon']}
        `('given "$query" returns $result', ({ query, result }) => {
          expect(stringMiddleware(query, context)).toIncludeSameMembers(result)
        })
      })
    })
  })
})
