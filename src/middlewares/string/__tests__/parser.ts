import parse from '../parser'
import Node from '../node'

describe('string middleware', () => {
  describe('parser', () => {
    it('parses simple expressions', () => {
      const node = new Node('operator', 'AND')
      node.addChild(new Node('query', 'a'))
      node.addChild(new Node('query', 'b'))

      expect(parse('a AND b')).toEqual(node)
    })

    it('parses multi-word queries', () => {
      const node = new Node('operator', 'AND')
      node.addChild(new Node('query', 'paper pen'))
      node.addChild(new Node('query', 'book'))

      expect(parse('paper pen AND book')).toEqual(node)
    })
  })
})
