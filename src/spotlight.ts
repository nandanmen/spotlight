import { Middleware } from './types'
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

  getResults(input: string): any[] {
    return this.middlewares.reduce(
      (acc, fn) => [...fn(input, this.searchContext), ...acc],
      [] as any[]
    )
  }
}

export default Spotlight
