import Spotlight from '../spotlight'
import { math } from '../middlewares'

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

    it('is extendable', () => {
      const spotlight = new Spotlight([])

      let results = spotlight.getResults('3 + 3')
      expect(results).toBeEmpty()

      results = spotlight.extend(math).getResults('3 + 3')
      expect(results).toContain(6)
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
