import { Router } from "express";
import auth from '../../../SRC/middleware/auth-token.js';
import fileUpload from "../../utils/multer.js";
import {getusers,deleteuser,updateuserimg} from '../user/controller.js';
import {asyncHandler} from '../../../SRC/utils/catcherror.js';

const router = Router();

   router.get('/',asyncHandler(getusers));

router.delete('/:id',auth(), asyncHandler(deleteuser));

router.put('/:id',fileUpload().single('images'),asyncHandler(updateuserimg ));

export default router;