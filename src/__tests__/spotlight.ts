import Spotlight from '../spotlight'

describe('spotlight', () => {
  describe('system', () => {
    it('constructs an instance of spotlight', () => {
      expect(new Spotlight([])).toBeInstanceOf(Spotlight)
    })

    it('calls middleware functions', () => {
      const middlewares = [
        jest.fn().mockReturnValue([]),
        jest.fn().mockReturnValue([])
      ]
      const spotlight = new Spotlight([], ...middlewares)
      spotlight.getResults('')
      middlewares.forEach(fn => expect(fn).toHaveBeenCalled())
    })
  })

  describe('file search', () => {
    const items = ['apple', 'orange', 'watermelon', 'melon']

    it('filters simple string searches', () => {
      const spotlight = new Spotlight(items)
      expect(spotlight.getResults('melon')).toIncludeSameMembers([
        'watermelon',
        'melon'
      ])
    })
  })
})
