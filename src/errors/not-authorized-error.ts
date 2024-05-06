import { CustomeError } from "./custom-error";

export class NotAuthorizedError extends CustomeError {
  statusCode = 401;

  constructor() {
    super('not authorized')
  }

  generateError() {
    return [{ message: 'not authorized' }]
  }
}