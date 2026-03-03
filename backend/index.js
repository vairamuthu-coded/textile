import express from 'express';
import path from 'path'
import cors from 'cors';
import dotenv from 'dotenv';
import cityRoutes from "../backend/routes/authRoutes.js";
dotenv.config();
const app = express();

app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

  app.use("/",cityRoutes);
  app.use("/getState",cityRoutes);
  app.use("/attendance",cityRoutes);
    app.use("/users",cityRoutes);
const PORT = process.env.DB_PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
