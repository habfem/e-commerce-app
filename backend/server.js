import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config();

connectDB();

const app = express();

app.use(express.json()) /// allows us to accept JSON data

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Error Handling

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))