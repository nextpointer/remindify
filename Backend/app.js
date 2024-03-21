import express from 'express'
const app=express()
const PORT =3000||process.env.PORT;

app.get('/',(req,res)=>{
    res.send('Ficj');
})

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})