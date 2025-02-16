import express from "express";
import cors from "cors";
import pollRoutes from "./routes/poll.routes.js";
import connectDB from "./config/db.config.js";     // Make sure to import connectDB
import dotenv from 'dotenv';

import { mongoose } from "mongoose";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/polls', pollRoutes);

const PORT = process.env.PORT || 5000;
connectDB()
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((err) => console.log(err));

process.on('SIGINT', async () => {
    await mongoose.connection.close();
})