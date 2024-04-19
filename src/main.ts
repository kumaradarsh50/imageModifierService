import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express'

import mongoose from 'mongoose'

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const start = async () => {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is required');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI)
  } catch (err) {
    throw new Error('database error!')
  }

  app.listen(5000, () => console.log('Server is up and running on port 5000'))

}

start()