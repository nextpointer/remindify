import mongoose from "mongoose";

const Schema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    Dept:{
        type:String
    },
    FavSubject:{
        type:String
    }
});

export const Model=mongoose.model('user',Schema);