import express from 'express';
import { connectdb } from './DB/connection.js';
import router from './SRC/modules/user/user.js';
const app=express();
connectdb();
app.use(express.json());
app.use('/user',router);

app.listen(3000,()=>{
    console.log(`server is running on port:3000`);
    
});
