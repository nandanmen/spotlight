import { Result } from 'types'

function dictMiddleware(input: string, context?: any[]): Result[] {
  return [] as Result[]
}

dictMiddleware.spotlightName = 'dict'

export default dictMiddleware
