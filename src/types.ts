export interface Middleware {
  (input: string, context: any[]): Result[]
  spotlightName: string
}

export type Result = {
  score: number
  value: any
}
