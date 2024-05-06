import { Request, Response, NextFunction } from "express";
import { CustomeError } from "../index";

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {

  if (error instanceof CustomeError) {
    // return res.status(error.statusCode).json({ errors: error.generateError() })
    return res.status(error.statusCode).json({ errors: error.generateError() })
  }
  res.status(500).json({ errors: [{ message: 'something went wrong' }] })
}


