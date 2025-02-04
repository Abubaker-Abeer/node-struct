import express from 'express';
import { connectdb } from './DB/connection.js';
import userrouter from './SRC/modules/user/user.js';
import authrouter from './SRC/modules/auth/auth.js';

const app=express();
connectdb();
app.use(express.json());

app.use('/user',userrouter);
app.use('/auth',authrouter);


app.listen(3000,()=>{
    console.log(`server is running on port:3000`);
    
});
