import { CustomeError } from "./custom-error";

export class DatabaseConnectionError extends CustomeError{
  statusCode = 500;

  constructor(){
    super('db connection error')
  }

  generateError(){
    return [{message: 'db connection error'}]
  }

}