import * as dotenv from 'dotenv';
dotenv.config();

import express, { NextFunction, Request, Response } from 'express'

import { BadRequestError, CustomeError, newImageRouter } from './index';
import { errorHandler } from './index';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())




app.use(newImageRouter);
app.use(errorHandler)


const start = async () => {
  app.listen(5000, () => console.log('Server is up and running on port 5000'))
}

start()