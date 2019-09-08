export interface DictionaryResult {
  word: string
  pronounciation: string
  results: Definition[]
}

export interface Definition {
  partOfSpeech: string
  definition: string
  example: string
}
