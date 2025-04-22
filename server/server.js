import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import mongoose from 'mongoose';


//configurations
dotenv.config();
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/auth',authRoutes);
app.use('/api/videos',videoRoutes);

// Static file serving for streaming
app.use('/videos', express.static('uploads'));



const PORT = process.env.PORT || 5000;
console.log("MONGO_URI:", process.env.MONGO_URI);
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
      })
      .catch((err) => console.error(err));




