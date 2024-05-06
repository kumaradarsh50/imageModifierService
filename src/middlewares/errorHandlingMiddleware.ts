import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { BadRequestError } from "../index";


// Error handling middleware
function handleMulterError(error: Error, req: Request, res: Response, next: NextFunction) {
  if (error instanceof multer.MulterError) {
    //   if (error.code === "LIMIT_UNEXPECTED_FILE") {
    //     return res.status(400).json({ error: "Only one file should be uploaded with the field name 'image'" });
    //   }
    // }
    // next(error);
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return next(new BadRequestError('Only one file should be uploaded'))
    }
  }
}


export { handleMulterError }