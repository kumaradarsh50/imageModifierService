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

      throw new ImageProcessingError('Invalid image or crop area');
    }

    const temp = { x: 30, y: 17, width: 244, height: 244 }
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


// sharp(imagePath)
//       .extract({ left: temp.x, top: temp.y, width: temp.width, height: temp.height })
//       .toFile(path.join('upload/' + 'modify' + image.filename), async (err, info) => {
//         if (err) {
//           return next(new ImageProcessingError('Error processing image: ' + err.message));
//         } else {
//           console.log(info)
// fs.unlink(path.join(`upload/${image.filename}`), () => { })
//         }
//       })