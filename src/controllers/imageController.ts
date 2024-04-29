import { Request, Response, NextFunction } from "express";
import { CropProperties, processImage } from "../index";


async function handleImageUpload(req: Request, res: Response, next: NextFunction) {



  const { file, body } = req;
  const parsedCropProperties = JSON.parse(body.cropProperties);


  if (!file) {
    return next(new Error('Image are required') as CustomeError)
  }

  // Check if crop properties exist in the request body
  const cropPropertiesData: CropProperties = parsedCropProperties;
  if (!cropPropertiesData) {
    return next(new Error('Crop properties are required') as CustomeError);
  }

  // Validate crop properties fields
  if (!isValidCropProperties(parsedCropProperties)) {
    return next(new Error('Invalid crop properties') as CustomeError);
  }


  try {
    const processImg = await processImage(file, cropPropertiesData, next)
    res.send(processImg);
  } catch (error) {
    next(new Error('somthing went wrong') as CustomeError)
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