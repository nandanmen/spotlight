export type Middleware = (input: string, context: any[]) => Result[]

export type Result = {
  score: number
  value: any
}
