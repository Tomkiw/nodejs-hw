import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';

const app = express();
// const PORT = 3000;

// const result = dotenv.config;
app.use(cors()); // securety for server render req and res
app.use(express.json()); // parsing JSON
app.use(helmet());

//add meadlewear Check err

app.get('/notes', (req, res) => {
  res.status(200).json({ message: 'Retrieved all notes' });
});

app.get('/notes/:noteId', (req, res) => {
  const { userId } = Number(req.params.userId);
  res.status(200).json({ message: `Retrieved note with ID: ${userId}` });
});

// Маршрут для тестування middleware помилки
app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

//Middleware for wrong Route
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Middleware для обробки помилок
app.use((err, req, res, next) => {
  // const isProd = process.env.NODE_ENV === 'production';

  // res.status(500).json({
  //   message: isProd ? 'Server error' : err.stack,
  // });
  res.status(500).json({ message: err.message });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
