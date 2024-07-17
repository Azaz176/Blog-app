import { Schema } from "mongoose";
const commentSchema= new Schema(
    {
        content:{
            type:String,
            required:true
        }
}, {timestamps:true})