import Spotlight from '../spotlight'

describe('spotlight', () => {
  it('constructs an instance of spotlight', () => {
    expect(new Spotlight([])).toBeInstanceOf(Spotlight)
  })
})
