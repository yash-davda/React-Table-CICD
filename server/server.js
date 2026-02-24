import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db.js'
import router from './routes/commentroute.js'
dotenv.config()
const app = express();
app.use(cors())
app.use(express.json());
connectDB();
app.use('/api/comments',router)
app.listen(process.env.PORT,()=>{
    console.log(`Database connect on ${process.env.PORT}`);
})