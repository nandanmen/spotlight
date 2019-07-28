import { Middleware } from './types'
import { searchFiles } from './middlewares'

class Spotlight<T> {
  searchContext: T[]
  middlewares: Middleware<T>[]

  constructor(searchContext: T[], ...middlewares: Middleware<T>[]) {
    const defaultMiddleware: Middleware<T>[] = [searchFiles]

    this.searchContext = searchContext
    this.middlewares = defaultMiddleware.concat(middlewares)
  }

  getResults(input: string): T[] {
    return this.middlewares.reduce(
      (acc, fn) => [...fn(input, this.searchContext), ...acc],
      [] as T[]
    )
  }
}

export default Spotlight
