import express  from "express";
import dotenv from 'dotenv';
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js"
import cors from "cors";
import categortRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import path from "path"
import { fileURLToPath } from 'url'


dotenv.config();
const app = express();

connectDB();
const __filename= fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)


app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'./client/build')))


// routes

app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category', categortRoutes)
app.use('/api/v1/product',productRoutes)


app.use('*',function(req,res){
   res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>
{
    console.log(`Server Running on ${PORT} on ${process.env.DEV_MODE}`)
})