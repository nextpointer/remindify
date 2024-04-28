import mongoose from "mongoose";

const CatagorySchema=mongoose.Schema(
    {
        _id:mongoose.Schema.Types.ObjectId,
        userId:{
            type:mongoose.Schema.type.ObjectId,
            ref:"user"
        },
        CatagoryName:{
            type:String,
            unique:true
        }
    },
    {
        timestamps:true
    }
);


export const Catagory=mongoose.model("Catagory",CatagorySchema);