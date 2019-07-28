export default function searchFiles<T>(input: string, context: T[]): T[] {
  return context.filter(value => new RegExp(input).test(String(value)))
}
