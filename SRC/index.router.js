import { connectdb } from '../DB/connection.js';
import userrouter from './modules/user/user.js';
import authrouter from './modules/auth/auth.js';
import blogrouter from './modules/blog/blog.js';

const initApp=(app,express)=>{
  
    connectdb();
    app.use(express.json());
    app.use('/user',userrouter);
    app.use('/auth',authrouter);
    app.use('/blog',blogrouter);
    app.use((err,req,res,next)=>{
    return  res.status(400).json({ msg: err.message });
    });
}
export  default initApp