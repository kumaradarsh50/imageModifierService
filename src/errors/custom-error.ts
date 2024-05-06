export abstract class CustomeError extends Error {
  abstract statusCode: number;

  constructor(message: string){
    super(message);
  }

  abstract generateError(): {message: string, field?: string}[]
}