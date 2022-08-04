import { APIError } from './APIError'

export interface ErrorVariant {
  errors: {
    data: APIError[]
    statusCode: number
    statusText: string
  }
}
