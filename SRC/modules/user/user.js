import { Router } from "express";
import auth from '../../../SRC/middleware/auth-token.js';
import fileUpload from "../../utils/multer.js";
import {getusers,deleteuser,updateuserimg} from '../user/controller.js';
const router = Router();

   router.get('/',auth(),getusers);
 

router.delete('/:id',auth(), deleteuser);

router.put('/:id',fileUpload().single('images'),updateuserimg );

export default router;