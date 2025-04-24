import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const connectDb = async ()=>{
    try{
     await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
     })
     console.log("MongoDb connected")
    }catch(err){
        console.error("MongoDB connection error:",err)
        process.exit(1) // exit process with failure
    }
}
connectDb()

app.get('/',(req,res)=> res.send('API running'))

const PORT = process.env.PORT || 5000
app.listen(PORT,() => console.log(`Server running on port ${PORT}`))
