import { Router, Request, Response, NextFunction } from "express";
import { handleImageUpload, handleMulterError, imageHeader, uploadImages } from "../index";


const router = Router()

router.post('/api/image/new', uploadImages, handleMulterError, imageHeader, handleImageUpload
);

export { router as newImageRouter }