import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/Reminder').then(()=>{
    console.log("MongoDb connected");
}).catch((err)=>{
    console.log(err);
})