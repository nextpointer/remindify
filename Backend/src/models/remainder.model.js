import mongoose from "mongoose";

const remainderSchema=new Schema(
    {
        _id:mongoose.Schema.Types.ObjectId,
        CatagoryID:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Catagory"
        },
        Heading:{
            type:String,
            required:true
        },
        Heading:{
            type:String,
            required:true
        },
        About:{
            type:String,
            required:true
        },
        RemindEvery:{
            type:String,
            required:true,
            default:null
        },
        RemindDate:{
            type:String,
            required:true,
            default:null
        },
        RemindTime:{
            type:String,
            required:true,
            default:null
        }
    },
    {
        timestamps:true
    }
);


export const Remainder=mongoose.model("Remainder",remainderSchema);