import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Title is required"]
    },
    author:{
        type: String,
        required: [true, "Author is required"]
    },
    description:{
        type: String,
        default:''
    },
    coverImage:{
        type: String,
        default:''
    },
    ratings:{
        type:[Number],
        default:[]
    }

},{timestamp:true})

export default mongoose.model('Book',bookSchema)