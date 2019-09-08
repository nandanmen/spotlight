import { Middleware, Result } from './types'
import * as defaults from './middlewares'

class Spotlight {
  searchContext: any[]
  middlewares: Middleware[]

  constructor(searchContext: any[], ...middlewares: Middleware[]) {
    const defaultMiddleware: Middleware[] = [defaults.string, defaults.math]

    this.searchContext = searchContext
    this.middlewares = defaultMiddleware.concat(middlewares)
  }

  extend(middleware: Middleware) {
    this.middlewares.push(middleware)
    return this
  }

  removeMiddleware(name: string) {
    this.middlewares = this.middlewares.filter(fn => fn.spotlightName !== name)
    return this
  }

  getResults(input: string): Result[] {
    const results = this.middlewares.reduce(
      (acc, fn) => [...fn(input, this.searchContext), ...acc],
      [] as Result[]
    )
    return results.sort((a, b) => a.score - b.score)
  }
}

export default Spotlight
