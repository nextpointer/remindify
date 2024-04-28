import express from 'express'
import './DB/connect.js';
import { Model } from './models/model.js';
const app=express()
const PORT =3000||process.env.PORT;

Model.create({
    name: 'Surajit',
    age: 21,
    Dept:"CSE",
    FavSubject: 'Nothing'
})

console.log(Model.create({
    name: 'Surajit',
    age: 24,
    Dept:"CSE",
    FavSubject: 'Nothing'
}));
app.get('/',(req,res)=>{
    res.send('Ficj');
})

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})