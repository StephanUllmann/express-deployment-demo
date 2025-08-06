import chalk from 'chalk';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import errorHandler from './middlewares/errorHandler.js';
import Post from './models/Post.js';
import ErrorResponse from './utils/ErrorResponse.js';

const app = express();
const port = process.env.PORT || 8912;

try {
  const mongo = await mongoose.connect(process.env.MONGO_URI);
  console.log(chalk.cyan(`✅ Connected to MongoDB: ${mongo.connection.name}`));
} catch (error) {
  console.log(error);
  process.exit(1);
}

app.use(express.json());

app.use(cors({
  
}));

app.get('/health', async (req, res) => {
  const dbResponse = await mongoose.connection.db.admin().ping();
  if (dbResponse.ok !== 1) throw new ErrorResponse('DB is not connected', 503);
  res.json({ message: 'Running', dbResponse });
});

app.post('/posting', async (req, res) => {
  const post = await Post(req.body);
  res.json({ post });
});

app.use('/{*splat}', (req, res) => {
  throw new ErrorResponse(`Check route. You used ${req.method} ${req.originalUrl}`, 404);
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(chalk.green(`✅ Express Deployment Test Server listening on port: ${port} `));
});
