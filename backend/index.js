import express from 'express';
import cookieParser from 'cookie-parser'
import dotEnv from 'dotenv'
import cors from 'cors';
import connectDB from './utils/db.js'
import userRoute from './routes/user.routes.js'
import companyRoute from './routes/company.routes.js'
import jobRouter from './routes/job.routes.js'

dotEnv.config({});

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


const corsOptions = {
    origin:'http//loaclhost:5173',
    credentials:true
}



app.use(cors(corsOptions));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job",  jobRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})