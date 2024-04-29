import * as dotenv from 'dotenv';
dotenv.config();

import express, { NextFunction, Request, Response } from 'express'

import { newImageRouter } from './index';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

declare global {
  interface CustomeError extends Error {
    status?: number
  }
}

app.use((error: CustomeError, req: Request, res: Response, next:
  NextFunction) => {
  if (error.status) {
    return res.status(error.status).json({ message: error.message })
  }
  res.status(500).json({ message: 'Something went wrong' })
})

app.use(newImageRouter);


const start = async () => {
  app.listen(5000, () => console.log('Server is up and running on port 5000'))
}

start()