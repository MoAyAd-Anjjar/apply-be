import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import applyRouter from './Routes/ApplyRoute';
import userRouter from './Routes/UserRoute';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT ;
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error('MongoDB URI is not defined');
}

// Connect to MongoDB using Mongoose
mongoose.connect(mongoUri, {
  serverSelectionTimeoutMS: 30000  // Increase timeout to 30 seconds
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB', error);
    process.exit(1); // Exit process if connection fails
  });

// Middleware
app.use(cors());
app.use(express.json());
app.use('/apply', applyRouter);
app.use('/user', userRouter);


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
