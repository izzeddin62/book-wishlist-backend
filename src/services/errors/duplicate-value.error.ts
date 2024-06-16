import { CustomError } from 'ts-custom-error'

export class DuplicateValueError extends CustomError {


  public constructor(name: string, property: string, value: string) {
    super(`A ${name} with ${property}: '${value}' already exists`)
  }
}