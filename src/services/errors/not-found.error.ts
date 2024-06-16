import { CustomError } from 'ts-custom-error'

export class NotFound extends CustomError {


  public constructor(name: string, property: string, value: string) {
    super(`A ${name} with ${property}: '${value}' not found`)
  }
}