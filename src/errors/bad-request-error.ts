import { CustomeError } from "./custom-error";

export class BadRequestError extends CustomeError {

  statusCode = 400;

  constructor(public message: string) {
    super(message)
  }

  generateError() {
    return [{
      message: this.message
    }]
  }
}  