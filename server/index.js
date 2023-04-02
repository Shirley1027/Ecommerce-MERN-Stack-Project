import express, { application } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan"
import authRoutes from './routes/auth.js';
import categoryRoutes from './routes/category.js';
import productRoutes from './routes/product.js';
import cors from "cors";
import bodyParser from 'body-parser';

dotenv.config();

const app = express();

// database
mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("DB connected"))
    .catch((err)=>console.log("DB ERROR =>", err));

//middwares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

//router middleware
app.use('/api',authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);

const port = process.env.PORT || 8000;

app.listen(port, ()=>{
    console.log(`Node server is running on port ${port}`);
});

//.env .gitignore
