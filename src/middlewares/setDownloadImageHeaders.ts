import { NextFunction, Request, Response } from "express";

function setImageDownloadHeaders(req: Request, res: Response, next: NextFunction) {
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Content-Disposition', 'attachment; filename="modified_image.png"');
  next();
}

export { setImageDownloadHeaders as imageHeader }