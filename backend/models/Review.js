import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    bookId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Book',
        required:true
    },
    text:{
        type: String,
        required:[true,"Review text is required"]
    },
    rating:{
        type: Number,
        min:1,
        max:5,
        required:[true,"Rating is required"]
    }
},{timestamp:true})

export default mongoose.model('Review',reviewSchema)