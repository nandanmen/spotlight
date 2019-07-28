export function searchFunction(input: string, item: any): boolean {
  return new RegExp(input).test(String(item))
}
