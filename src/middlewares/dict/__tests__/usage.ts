import dictMiddleware from '..'
import { DictionaryResult } from '../types'

const mockDefinitions: Record<string, DictionaryResult> = {
  hello: {
    word: 'hello',
    pronounciation: `hɛ'loʊ`,
    results: [
      {
        partOfSpeech: 'noun',
        definition: 'an expression of greeting',
        example: 'every morning they exchanged polite hellos'
      }
    ]
  }
}

jest.mock('../client', () => {
  return {
    getDefinition: (word: string) => mockDefinitions[word]
  }
})

function getResult(input: string, word: string) {
  const result = dictMiddleware(input)
  const expected = mockDefinitions[word]
  return { result: result[0].value, expected }
}

describe('dict middleware', () => {
  it('returns empty array if input string is more than one word long', () => {
    expect(dictMiddleware('')).toBeEmpty()
  })

  it('returns results if input is one word long', () => {
    const { result, expected } = getResult('hello', 'hello')
    expect(result).toEqual(expected)
  })

  it('returns results if input starts with "define"', () => {
    const { result, expected } = getResult('define hello', 'hello')
    expect(result).toEqual(expected)
  })
})
