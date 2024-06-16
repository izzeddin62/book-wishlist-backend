import { CustomError } from 'ts-custom-error'

export enum Reason {
  USER_NOT_FOUND = 'user not found',
  WRONG_CRENDENTIALS = 'invalid email or password',
}

export class AuthenticationError extends CustomError {
  public constructor(reason: Reason) {
    super(`Authentication failed: ${reason}`)
  }
}