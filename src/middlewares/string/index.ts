function match<T>(input: string, context: T[]) {
  return context.filter(value => new RegExp(input).test(String(value)))
}

export default function stringMiddleware<T>(input: string, context: T[]): T[] {
  return match(input, context)
}
