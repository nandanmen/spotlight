export type Middleware<T> = (input: string, context: T[]) => T[]
