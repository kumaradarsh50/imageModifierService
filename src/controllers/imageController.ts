import { Request, Response, NextFunction } from "express";
import { BadRequestError, CropProperties, processImage } from "../index";


async function handleImageUpload(req: Request, res: Response, next: NextFunction) {


  try {
    const { file, body } = req;
    const parsedCropProperties = JSON.parse(body.cropProperties);


    if (!file) {
      return next(new BadRequestError('Image are required'))
    }

    // Check if crop properties exist in the request body
    const cropPropertiesData: CropProperties = parsedCropProperties;
    if (!cropPropertiesData) {
      return next(new BadRequestError('Crop properties are required'));
    }

    // Validate crop properties fields
    if (!isValidCropProperties(parsedCropProperties)) {
      return next(new BadRequestError('Invalid crop properties'));
    }



    const processImg = await processImage(file, cropPropertiesData, next)
    res.send(processImg);
  } catch (error) {
    next(new Error('somthing went wrong'))
  }


}

// Function to validate crop properties fields
function isValidCropProperties(cropProperties: CropProperties): boolean {

  return (
    Number.isInteger(cropProperties.x) &&
    Number.isInteger(cropProperties.y) &&
    Number.isInteger(cropProperties.width) &&
    Number.isInteger(cropProperties.height) &&
    cropProperties.x >= 0 &&
    cropProperties.y >= 0 &&
    cropProperties.width > 0 &&
    cropProperties.height > 0
  );
}

export { handleImageUpload as handleImageUpload }