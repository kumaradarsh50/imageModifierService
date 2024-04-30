import sharp from "sharp"
import fs from 'fs';
import path from 'path'
import { CropProperties } from "../index"
import { NextFunction } from "express";


class ImageProcessingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ImageProcessingError";
  }
}

async function newImage(image: Express.Multer.File, cropProperties: CropProperties, next: NextFunction) {
  const imagePath = image.path;

  try {
    // Get the dimensions of the image
    const imageMetadata = await sharp(imagePath).metadata();

    // Check if image metadata is not available or if the crop area exceeds the image dimensions
    if (
      imageMetadata?.width === undefined ||
      imageMetadata?.height === undefined ||
      cropProperties.x + cropProperties.width > imageMetadata.width ||
      cropProperties.y + cropProperties.height > imageMetadata.height
    ) {
      fs.unlink(path.join(`upload/${image.filename}`), () => { })
      // throw new ImageProcessingError('Invalid image or crop area');
      return next(new Error('Invalid image or crop area') as CustomeError)
    }


    const processedImg = await sharp(imagePath)
      .extract({ left: cropProperties.x, top: cropProperties.y, width: cropProperties.width, height: cropProperties.height })
      .toBuffer();
    fs.unlink(path.join(`upload/${image.filename}`), () => { })


    return processedImg
  } catch (error) {
    return next(new ImageProcessingError('Error processing image: ' + error));
  }
}

export { newImage as processImage }
