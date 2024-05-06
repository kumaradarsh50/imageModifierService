import { CustomeError } from "./custom-error";

export class NotFoundError extends CustomeError {
  statusCode = 404;

  constructor() {
    super('not found!')
  }

  generateError() {
    return [{ message: 'not found!' }]
  }
}